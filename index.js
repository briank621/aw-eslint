module.exports.rules = {
    'no-calls-as-function-arguments': (context) => {
        return {
            CallExpression: (node) => {
                const args = node.arguments;
                args.forEach((arg) => {
                    if (arg.type === 'CallExpression') {
                        context.report(
                            arg,
                            'Unexpected function call in function arguments',
                        );
                    }
                });
            },
        };
    },
    'no-relative-imports': (context) => {
        return {
            ImportDeclaration: (node) => {
                const { source } = node;
                const rawPath = source.raw;
                if (rawPath.includes('..')) {
                    context.report(
                        node,
                        'Unexpected import from parent directory',
                    );
                }
            },
        };
    },
};
