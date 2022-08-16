import Pusher from 'pusher';

export module pusherOST{
    
    const pusher = new Pusher({
        appId: `${process.env.PUSHER_APP_ID}`,
        key: `${process.env.PUSHER_API_KEY}`,
        secret: `${process.env.PUSHER_API_SECRET}`,
        cluster: `${process.env.PUSHER_APP_CLUSTER}`,
        useTLS: true
      });

    export const tocTrigger = (sectionName: string, initiativeId: string, subItemId?: string) => {
        pusher.trigger(`${sectionName}-${initiativeId}${subItemId?`-${subItemId}`:``}`, "updateToc", { message: "hello world" });
    }
}