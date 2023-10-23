var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { DOM } from 'thorium-framework';
import { createTerminal } from 'terminatorator';
import { computer } from '@neutralinojs/lib';
import style from './style.module.css';
// import Datastore from 'nedb';
import { insert, find } from '@modules/database';
export class Console {
    static get toolbox() {
        return {
            title: 'Console',
            icon: `C`
            // icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
        };
    }
    render() {
        let { virtual: VirtualDOM } = DOM;
        return VirtualDOM.createNodeElement(<div class={style.Terminal}>
      <div _afterMounting={(target) => __awaiter(this, void 0, void 0, function* () {
                let { name } = yield computer.getOSInfo();
                // const new Datastore();
                createTerminal(target, {
                    welcome: `・●・ DATABASE CONSOLE ・●・`,
                    theme: 'interlaced',
                    // using the `theme` command
                    commands: {
                        '/usr/local/bin/database': {
                            handler: (args, session) => __awaiter(this, void 0, void 0, function* () {
                                let response = {};
                                try {
                                    if ('insert' in args)
                                        response = (yield insert(JSON.parse(args.insert))).detail;
                                    else if ('find' in args)
                                        response = (yield find(JSON.parse(args.find))).detail;
                                }
                                catch (error) {
                                    console.log(error);
                                }
                                finally {
                                    return JSON.stringify(response);
                                }
                            }),
                            args: {
                                'x': 'test'
                            }
                        }
                    },
                    files: {},
                    history: 'cli-history',
                    user: name // which user to be logged in as
                });
            })}/>
    </div>);
    }
    save(blockContent) {
        return {
            url: blockContent.value
        };
    }
}
//# sourceMappingURL=index.jsx.map