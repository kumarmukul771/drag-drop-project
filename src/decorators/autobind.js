export function autobind(_target, _methodName, descriptor) {
    const originalMethod = descriptor.value;
    const adjDecorator = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDecorator;
}
//# sourceMappingURL=autobind.js.map