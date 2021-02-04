import c from '@/../config/config.json';

const socket = [];
export function listen(action: any) {
  c.WEBSOCKETURLS.map(function (it: any, idx: number) {
    const _ws = { name: it.name, ws: new WebSocket(`${it.url}`) };
    console.log(`已建立连接 连接id:${it.name}`);
    action({
      type: 'init',
      data: _ws,
    });
    socket.push(_ws);
  });
}
