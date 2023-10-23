import * as dynamics from 'dynamics.js';
export const OpenSpring = (target) => {
    let children = Object.values(target.children);
    dynamics.animate(target, {
        scale: 1,
        opacity: 1
    }, {
        type: dynamics.spring,
        frequency: 200,
        friction: 270,
        duration: 800
    });
    let i = 0;
    for (const element of children) {
        dynamics.css(element, {
            opacity: 0,
            translateY: 20
        });
        dynamics.animate(element, {
            opacity: 1,
            translateY: 0
        }, {
            type: dynamics.spring,
            frequency: 300,
            friction: 435,
            duration: 1000,
            delay: 100 + (i * 2)
        });
        i += i + 1;
    }
};
//# sourceMappingURL=spring.js.map