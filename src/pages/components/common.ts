
import G6 from '@antv/g6'
export function renderMap(data, graph) {
    const COLLAPSE_ICON = function COLLAPSE_ICON(x, y, r) {
        return [
            ['M', x - r, y - r],
            ['a', r, r, 0, 1, 0, r * 2, 0],
            ['a', r, r, 0, 1, 0, -r * 2, 0],
            ['M', x + 2 - r, y - r],
            ['L', x + r - 2, y - r],
        ];
    };
    const EXPAND_ICON = function EXPAND_ICON(x, y, r) {
        return [
            ['M', x - r, y - r],
            ['a', r, r, 0, 1, 0, r * 2, 0],
            ['a', r, r, 0, 1, 0, -r * 2, 0],
            ['M', x + 2 - r, y - r],
            ['L', x + r - 2, y - r],
            ['M', x, y - 2 * r + 2],
            ['L', x, y - 2],
        ];
    };
    G6.Util.traverseTree(data, (d) => {
        d.leftIcon = {
            style: {
                fill: '#3759B0',
                stroke: '#e6fffb',
            },
        };
        return true;
    });

    G6.registerNode('icon-node', {
        options: {
            size: [60, 20],
            stroke: '#73D13D',
            fill: '#fff'
        },
        draw(cfg, group) {
            const styles = this.getShapeStyle(cfg)
            const { labelCfg = {} } = cfg

            const w = cfg.size[0]
            const h = cfg.size[1]
            console.log('123', w, h)
            const keyShape = group.addShape('rect', {
                attrs: {
                    ...styles,
                    cursor: 'pointer',
                    x: 0,
                    y: 0,
                    width: w, //200,
                    height: h, // 60
                },
                name: 'node-rect',
                draggable: true
            })

            /**
             * leftIcon 格式如下：
             *  {
             *    style: ShapeStyle;
             *    img: ''
             *  }
             */
            // console.log('cfg.leftIcon', cfg.leftIcon);
            if (cfg.leftIcon) {
                const { style, img } = cfg.leftIcon
                // group.addShape('rect', {
                //     attrs: {
                //         x: 10,
                //         y: 8,
                //         width: 24,
                //         radius: 12,
                //         height: styles.height - 16,
                //         fill: '#8c8c8c',
                //         ...style
                //     }
                // })
                // group.addShape('text', {
                //     attrs: {
                //         text: cfg.name,
                //         x: 22,
                //         y: 21,
                //         fill: '#ffffff',
                //         fontSize: 12,
                //         textAlign: 'center',
                //         textBaseline: 'middle',
                //         fontWeight: 'bold',
                //     },
                //     name: 'text-shape',
                // });
                group.addShape('image', {
                    attrs: {
                        x: 8,
                        y: 8,
                        width: 24,
                        height: 24,
                    },
                    name: 'image-shape',
                });
            }

            // 如果不需要动态增加或删除元素，则不需要 add 这两个 marker
            group.addShape('marker', {
                attrs: {
                    x: 130,
                    y: 18,
                    r: 6,
                    stroke: '#707070',
                    cursor: 'pointer',
                    symbol: EXPAND_ICON,
                    opacity: 1,
                },
                name: 'add-item'
            })

            group.addShape('marker', {
                attrs: {
                    x: 130,
                    y: 36,
                    r: 6,
                    stroke: '#5C5C5C',
                    cursor: 'pointer',
                    symbol: COLLAPSE_ICON,
                    opacity: 1
                },
                name: 'remove-item'
            })

            if (cfg.label) {
                group.addShape('text', {
                    attrs: {
                        ...labelCfg.style,
                        text: cfg.label,
                        textAlign: 'left',
                        x: 50,
                        y: 25,
                    }
                })
            }
            // 展开收起
            cfg.children &&
                group.addShape('marker', {
                    attrs: {
                        x: 145,
                        y: 20,
                        r: 6,
                        cursor: 'pointer',
                        symbol: G6.Marker.collapse,
                        stroke: '#666',
                        lineWidth: 1,
                        fill: '#fff'
                    },
                    name: 'collapse-icon'
                })

            return keyShape
        },
        setState(name, value, item) {
            let group = item?.getContainer()
            if (name === 'collapsed') {
                const marker = item.get('group').find((ele) => ele.get('name') === 'collapse-icon')
                const icon = value ? G6.Marker.expand : G6.Marker.collapse
                marker.attr('symbol', icon)
            }
            if (name === 'selected') {

                let nodeRect = group?.find(function (e) {
                    return e.get('name') === 'node-rect'
                })
                if (value) {
                    nodeRect?.attr({
                        stroke: '#2196f3',
                        lineWidth: 2
                    })
                }
            }
            if (name == 'hover') {
                let addMarker = group?.find(function (e) {
                    return e.get('name') === 'add-item'
                })
                let reduceMarker = group?.find(function (e) {
                    return e.get('name') === 'remove-item'
                })
                if (value) {
                    reduceMarker?.attr({
                        opacity: 1
                    })
                    reduceMarker?.attr({
                        opacity: 1
                    })
                }
            }
        },
        update: undefined,
    }, 'rect')

    G6.registerEdge('flow-line', {
        draw(cfg, group) {
            const startPoint = cfg.startPoint;
            const endPoint = cfg.endPoint;

            const { style } = cfg
            const shape = group.addShape('path', {
                attrs: {
                    stroke: style.stroke,
                    endArrow: style.endArrow,
                    path: [
                        ['M', startPoint.x, startPoint.y],
                        ['L', startPoint.x, (startPoint.y + endPoint.y) / 2],
                        ['L', endPoint.x, (startPoint.y + endPoint.y) / 2,],
                        ['L', endPoint.x, endPoint.y],
                    ],
                },
            });

            return shape;
        }
    });

    const width = document.getElementById('container').scrollWidth || 1000;
    const height = document.getElementById('container').scrollHeight || 500;

    graph.data(data);
    graph.render();
    graph.fitView();
    graph.on('node:click', () => {
        graph.setMode('edit')
    })
    graph.on('node:mouseenter', evt => {
        const { item } = evt
        graph.setItemState(item, 'hover', true)
    })

    graph.on('node:mouseleave', (evt) => {
        const { item } = evt;
        graph.setItemState(item, 'hover', false);
    });
    // 展开和收起子节点
    graph.on('node:click', (e) => {
        if (e.target.get('name') === 'collapse-icon') {
            e.item.getModel().collapsed = !e.item.getModel().collapsed
            graph.setItemState(e.item, 'collapsed', e.item.getModel().collapsed)
            graph.layout()
        }
    })
}