var app = new Vue({
    el: '#app',
    data: {
        conversations: 
        [
            {
                name: "Pippo🍾",
                lastSeen: "03/15/2022 12:30:55",
                profilePic: "img/profile-pic_1.jpg",
                messages: [
                    {
                        date: "10/01/2020 15:30:55",
                        text: "Hai portato a spasso il cane?",
                        media: "https://mypetandme.elanco.com/sites/g/files/adhwdz651/files/styles/image_642w_x_424h/public/2020-07/cane_di_labrador_retriever_disteso_nel_parco_in_una_giornata_soleggiata.jpg?itok=VMZil_AA",
                        isReceived: false
                    },
                    {
                        date: "10/01/2020 15:50:55",
                        text: "Ricordati di stendere i panni",
                        media: null,
                        isReceived: false
                    },
                    {
                        date: "3/15/2022 16:10:55",
                        text: "Ok",
                        media: null,
                        isReceived: true
                    }
                ]
            },
            {
                name: "Fefe",
                lastSeen: "03/14/2022 15:30:55",
                profilePic: "img/profile-pic_2.jpg",
                messages: [
                    {
                        date: "03/13/2022 15:30:55",
                        text: "Ciao fede, come stai?",
                        media: null,
                        isReceived: false
                    },
                    {
                        date: "03/13/2020 15:50:55",
                        text: "Tutto bene dai! tu?",
                        media: null,
                        isReceived: true
                    },
                    {
                        date: "03/14/2022 16:10:55",
                        text: "Alla grande!",
                        media: null,
                        isReceived: true
                    }
                ]
            },
            {
                name: "Babbo",
                lastSeen: "03/11/2022 12:30:55",
                profilePic: "img/profile-pic_4.jpg",
                messages: [
                    {
                        date: "10/01/2020 15:30:55",
                        text: "Hai portato a spasso il cane?",
                        media: null,
                        isReceived: false
                    },
                    {
                        date: "10/01/2020 15:50:55",
                        text: "Ricordati di stendere i panni",
                        media: null,
                        isReceived: false
                    },
                    {
                        date: "3/11/2022 16:10:55",
                        text: "Tutto fatto!",
                        media: null,
                        isReceived: true
                    }
                ]
            }
        ],
        currentChat: null,
        newMsg: "",
        conversationsFiltered: null,
        query: "",
        replyMessages: [
            "I love the smell of napalm in the morning.",
            "I'm gonna make him an offer he can't refuse.",
            "Frankly, my dear, I don't give a damn.",
            "I will look for you, I will find you, and I will kill you.",
            "😂😂😂😂",
        ]
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
                    return "today at "+date.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' });
                }else{ 
                    return date.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' });
                }; 
            }

            if(date.getDate() == yesterday.getDate() && date.getMonth() == yesterday.getMonth() &&
            date.getFullYear() == yesterday.getFullYear()){
                if(isContact){ 
                    return "yesterday at "+date.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' });
                }else{ 
                    return "Yesterday";
                }
            }

            return date.toLocaleDateString('en-US') +" at "+ date.toLocaleTimeString('en-US');
        },
        sendMessage(currentChat){
            if(this.newMsg.trim() == "") return;
            let newDate = new Date().toLocaleString("en-US"); 
            currentChat.messages.push({ date: newDate, text: this.newMsg, isReceived: false});
            this.newMsg = "";
            this.replyMessage(currentChat);
        },
        searchConversations(){
            this.conversationsFiltered = this.conversations.filter(conv => conv.name.toLowerCase().startsWith(this.query.trim().toLowerCase()));
        },
        replyMessage(currentChat){
            let newDate = new Date().toLocaleString("en-US"); 
            let randN = Math.floor(Math.random() * this.replyMessages.length)
            setTimeout(()=>{
                currentChat.messages.push({date: newDate, text: this.replyMessages[randN], isReceived: true})
            }, 2000);
        }
    },
    created(){
        this.conversationsFiltered = [...this.conversations];
    }
  });
  