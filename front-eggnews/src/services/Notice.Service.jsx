import { API_SERVER } from '../config/constant'

class NoticeService {

    async getAllNotices(){
        const response = await fetch(API_SERVER.ALL_NOTICES());
        return response;
    }

    async getNoticeById(id){
        const response = await fetch(API_SERVER.NOTICE_BY_ID(id));
        return response; 
    }

    async getAllNoticesAdmin(){
        const response = await fetch(API_SERVER.ALL_NOTICES_ADMIN());
        return response;
    }

    async saveNotice(id){
        const response = await fetch(API_SERVER.SAVE_NOTICE(id));
        return response; 
    }

    async updateNotice(id){
        const response = await fetch(API_SERVER.UPDATE_NOTICE(id));
        return response;
    }

    async deleteNotice(id){
        const response = await fetch(API_SERVER.DELETE_NOTICE(id));
        return response; 
    }

    async login(){
        const response = await fetch(API_SERVER.LOGIN());
        return response; 
    }

}