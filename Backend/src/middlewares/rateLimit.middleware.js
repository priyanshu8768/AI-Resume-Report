const rateLimitStore = new Map();

const defaultKeyGenerator = (req) => {
    if (req.user && req.user.id) {
        return `user:${req.user.id}`;
    }
    return `ip:${req.ip}`;
};

export const createRateLimiter = ({ windowMs = 15 * 60 * 1000, max = 5, keyGenerator = defaultKeyGenerator } = {}) => {
    return (req, res, next) => {
        const key = keyGenerator(req);
        const now = Date.now();
        const entry = rateLimitStore.get(key) || { count: 0, resetAt: now + windowMs };

        if (entry.resetAt <= now) {
            entry.count = 0;
            entry.resetAt = now + windowMs;
        }

        entry.count += 1;
        rateLimitStore.set(key, entry);

        const remaining = max - entry.count;
        res.set('X-RateLimit-Limit', String(max));
        res.set('X-RateLimit-Remaining', String(Math.max(0, remaining)));
        res.set('X-RateLimit-Reset', String(Math.floor(entry.resetAt / 1000)));

        if (entry.count > max) {
            return res.status(429).json({
                message: 'Too many requests. Please wait before trying again.',
                limit: max,
                retryAfter: Math.ceil((entry.resetAt - now) / 1000)
            });
        }

        next();
    };
};

export const aiRateLimiter = createRateLimiter({ windowMs: 15 * 60 * 1000, max: 3 });
