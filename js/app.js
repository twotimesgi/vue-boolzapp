var app = new Vue({
    el: '#app',
    data: {
        conversations: 
        [
            {
                name: "Pippo",
                lastSeen: "03/15/2022 12:30:55",
                profilePic: "https://avatars.dicebear.com/api/miniavs/avatar2.svg",
                messages: [
                    {
                        date: "10/01/2020 15:30:55",
                        text: "Hai portato a spasso il cane?",
                        isReceived: false
                    },
                    {
                        date: "10/01/2020 15:50:55",
                        text: "Ricordati di stendere i panni",
                        isReceived: false
                    },
                    {
                        date: "3/15/2022 16:10:55",
                        text: "Tutto fatto!",
                        isReceived: true
                    }
                ]
            },
            {
                name: "Federica",
                lastSeen: "03/14/2022 15:30:55",
                profilePic: "https://avatars.dicebear.com/api/miniavs/avatar1.svg",
                messages: [
                    {
                        date: "03/13/2022 15:30:55",
                        text: "Ciao fede, come stai?",
                        isReceived: false
                    },
                    {
                        date: "03/13/2020 15:50:55",
                        text: "Tutto bene dai! tu?",
                        isReceived: true
                    },
                    {
                        date: "03/14/2022 16:10:55",
                        text: "Alla grande!",
                        isReceived: true
                    }
                ]
            }
        ],
        currentChat: null
    },
    methods:{
        chatSwitch(contact){
            this.currentChat = contact;
        },
        isFirstMsg(message,index){
           if(index == 0 || this.currentChat.messages[index].isReceived != this.currentChat.messages[index-1].isReceived){
               return true;
           }
           return false;
        },
        getMessageTime(message){
            let date = new Date(message.date);
            return date.toLocaleTimeString("en-US", {hour: '2-digit', minute: '2-digit'});
        },
        dateToText(obj, isContact = true){
            let date = isContact ? new Date(obj.lastSeen) : new Date(obj.date);  
            let today = new Date();
            let yesterday = new Date((new Date()).valueOf() - 1000*60*60*24);

            if(date.getDate() == today.getDate() && date.getMonth() == today.getMonth() &&
            date.getFullYear() == today.getFullYear()){
                if(isContact){ 
                    return "Today at "+date.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' });
                }else{ 
                    return date.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' });
                }; 
            }

            if(date.getDate() == yesterday.getDate() && date.getMonth() == yesterday.getMonth() &&
            date.getFullYear() == yesterday.getFullYear()){
                if(isContact){ 
                    return "Today at "+date.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' });
                }else{ 
                    return "Yesterday";
                }
            }

            return date.toLocaleDateString('en-US') +" "+ date.toLocaleTimeString('en-US');
        }
    },
  });
  