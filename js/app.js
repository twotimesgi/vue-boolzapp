var app = new Vue({
    el: '#app',
    data: {
        conversations: 
        [
            {
                name: "Pippo",
                lastSeen: "15/03/2022 12:30:55",
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
                        date: "10/01/2020 16:10:55",
                        text: "Tutto fatto!",
                        isReceived: true
                    }
                ]
            },
            {
                name: "Federica",
                lastSeen: "10/01/2020 15:30:55",
                profilePic: "https://avatars.dicebear.com/api/miniavs/avatar1.svg",
                messages: [
                    {
                        date: "10/01/2020 15:30:55",
                        text: "Ciao fede, come stai?",
                        isReceived: false
                    },
                    {
                        date: "10/01/2020 15:50:55",
                        text: "Tutto bene dai! tu?",
                        isReceived: true
                    },
                    {
                        date: "10/01/2020 16:10:55",
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
            return date.toTimeString().slice(0, 5);
        },
        getLastSeen(contact){
            let date = new Date(contact.lastSeen);
            return this.dateToText(date);
        },
        dateToText(date){
            if(someDate.getDate() == today.getDate() &&
            someDate.getMonth() == today.getMonth() &&
            someDate.getFullYear() == today.getFullYear()) return "Today";
        }
    },
    created(){
        this.currentChat = this.conversations[0];
    }
  })