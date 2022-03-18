var app = new Vue({
    el: '#app',
    data: {
        conversations: 
        [
            {
                name: "Philip",
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
                name: "Sarah",
                lastSeen: "03/15/2022 15:30:55",
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
                        date: "03/15/2022 16:10:55",
                        text: "Alla grande!",
                        media: null,
                        isReceived: true
                    }
                ]
            },
            {
                name: "Dad",
                lastSeen: "03/11/2022 12:30:55",
                profilePic: "img/profile-pic_4.jpg",
                messages: [
                    {
                        date: "10/01/2020 15:30:55",
                        text: "Your great aunt just passed away. LOL",
                        media: null,
                        isReceived: true
                    },
                    {
                        date: "10/01/2020 15:50:55",
                        text: "Why is that funny??",
                        media: null,
                        isReceived: false
                    },
                    {
                        date: "3/11/2022 16:10:55",
                        text: "It's not funny at all!",
                        media: null,
                        isReceived: true
                    },
                    {
                        date: "3/11/2022 16:10:55",
                        text: "Why do you think it's funny?",
                        media: null,
                        isReceived: true
                    },
                    {
                        date: "3/11/2022 16:10:55",
                        text: "Why do you think it's funny?",
                        media: null,
                        isReceived: true
                    },
                    {
                        date: "3/11/2022 16:10:55",
                        text: "Dad lol means laughing out loud!",
                        media: null,
                        isReceived: false
                    },
                    {
                        date: "3/11/2022 16:10:55",
                        text: "Ohh my god! I sent that to everyone.",
                        media: null,
                        isReceived: true
                    },
                    {
                        date: "3/11/2022 16:10:55",
                        text: "I thought it means lots of love.",
                        media: null,
                        isReceived: true
                    }
                ]
            },
            {
                name: "Dave",
                lastSeen: "03/11/2022 12:30:55",
                profilePic: "img/profile-pic_6.jpg",
                messages: [
                    {
                        date: "10/01/2020 15:30:55",
                        text: "Sai che ieri sono andato a mangiare al Sushi?",
                        media: null,
                        isReceived: true
                    },
                    {
                        date: "10/01/2020 15:50:55",
                        text: "Si? Ti sei trovato bene?",
                        media: null,
                        isReceived: false
                    },
                    {
                        date: "3/11/2022 16:10:55",
                        text: "Molto!",
                        media: null,
                        isReceived: true
                    }
                ]
            },
            {
                name: "Alby Graz",
                lastSeen: "03/16/2022 11:30:55",
                profilePic: "img/profile-pic_5.jpg",
                messages: []
            }
        ],
        search: "",
        currentChat: null,
        newMsg: "",
        conversationsFiltered: null,
        query: "",
        replyMessages: [
            "Ok great!",
            "Good, do what you want.",
            "Frankly, my dear, I don't give a damn.",
            "LOL😂😂😂",
            "OMG😮"
        ],
        contactStatus: "",
        isMenuOpen: false,
        darkTheme: false
    },
    methods:{
        themeSwitch(){
            this.darkTheme = !this.darkTheme;
        },
        chatSwitch(contact){
            this.currentChat = contact;
            this.scrollToLast();
        },
        isFirstMsg(message,index){
           if(index == 0 || this.currentChat.messages[index].isReceived != this.currentChat.messages[index-1].isReceived){
               return true;
           }
           return false;
        },
        isLastMsg(message,index){
            if(index == this.currentChat.messages.length-1 || this.currentChat.messages[index].isReceived != this.currentChat.messages[index+1].isReceived){
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
            this.sentSound();
            this.replyMessage(currentChat);
        },
        searchConversations(){
            this.conversationsFiltered = this.conversations.filter(conv => conv.name.toLowerCase().startsWith(this.query.trim().toLowerCase()));
        },
        replyMessage(currentChat){
            let newDate = new Date().toLocaleString("en-US"); 
            let randN = Math.floor(Math.random() * this.replyMessages.length)
            this.contactStatus = "Typing...";

            setTimeout(()=>{
                currentChat.messages.push({date: newDate, text: this.replyMessages[randN], isReceived: true});
                this.receivedSound()
                currentChat.lastSeen = newDate;
                this.contactStatus = "Online";
                this.scrollToLast();
            }, 2000);

            setTimeout(()=>{
                this.contactStatus = "";
            },4000);
        },
        msgMenu(){
            this.isMenuOpen = !this.isMenuOpen;
        },
        deleteMsg(index){
            this.currentChat.messages.splice(index,1);
        },
        scrollToLast() {
            this.$nextTick(() => {
                this.$refs.box.scrollTop = this.$refs.box.scrollHeight
              })
        },
        sentSound() {
            let audioSent = new Audio("../audio/01.mp3");
            audioSent.play();
            audioSent.volume = 0.3;
        },
        receivedSound() {
            let audioReceived = new Audio("../audio/02.mp3");
            audioReceived.play();
            audioReceived.volume = 0.3;
        },
        insert(emoji) {
            this.newMsg += emoji
        },
    },
    created(){
        this.conversationsFiltered = [...this.conversations];
    }
  });
  
  