<template>
  <div class="layout">
    <!-- left card -->
    <div class="leftCardContainer">
      <div class="card">
        <b-img class="image" :src="require('../assets/image.jpg')"></b-img>
        <b-card-text class="header"> {{ personalInfos.name }} </b-card-text>
        <div class="infoCard">
          <img class="icon" src="../assets/phone.png" />
          <span class="label">{{ phoneNum }}</span>
        </div>
        <div class="infoCard">
          <img class="icon" src="../assets/category.png" />
          <span class="label">{{ bsInfo }}</span>
        </div>
        <div class="infoCard">
          <img class="icon" src="../assets/shop.png" />
          <span class="label">{{ address }}</span>
        </div>
      </div>
    </div>
    <!-- right card -->
    <div class="rightCardContainer">
      <b-card class="card">
        <b-card-text class="header"> {{ postName }} </b-card-text>
        <b-card-text class="subHeader"> {{ posts.length }} POSTS </b-card-text>
        <div class="postContainer">
          <div v-for="post of posts" :key="'keyword_' + post.id">
            <div class="post_card">
              <div class="textbox"><span class="title">{{ post.title.charAt(0).toUpperCase() + post.title.slice(1) }}</span></div>
              <div class="textbox"><span class="body">{{ post.body }}</span></div>
            </div>
          </div>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      personalInfos: null,
      posts: [],
      phoneNum: null,
      bsInfo: null,
      address: null,
      postName: null,
    };
  },
  methods: {
    init() {
      console.log("init");
      const userURI = "https://jsonplaceholder.typicode.com/users/1";
      this.$http.get(userURI).then((result) => {
        this.personalInfos = result.data;
        this.updatePhoneNum(result.data);
        this.updateBsInfo(result.data);
        this.updateAddress(result.data);
        this.updatePostName(result.data);
        console.log(result.data);
      });
      const postURI = "https://jsonplaceholder.typicode.com/posts?userId=1";
      this.$http.get(postURI).then((result) => {
        this.posts = result.data;
      });
    },
    updatePhoneNum(e) {
      console.log("phoneNum");
      this.phoneNum = e.phone.split("x")[0];
    },
    updateBsInfo(e) {
      const bsInfo = e.company.bs.split(" ");
      var tempstring = "";
      for (let i = 0; i < bsInfo.length; i++) {
        bsInfo[i] = bsInfo[i].charAt(0).toUpperCase() + bsInfo[i].slice(1);
        if (i > 0) {
          bsInfo[i] = " • " + bsInfo[i];
        }
        tempstring = tempstring + bsInfo[i];
      }
      this.bsInfo = tempstring;
    },
    updateAddress(e) {
      this.address =
        e.address.street +
        ", " +
        e.address.suite +
        ", " +
        e.address.city +
        " " +
        e.address.zipcode.split("-")[0];
    },
    updatePostName(e) {
      this.postName = e.name.split(" ")[0] + " 's" + " Posts";
    },
  },
  beforeMount() {
    this.init();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.layout {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  height: 100vh;
  background-color: rgb(247, 247, 247);
}
.card {
  background-color: rgb(253, 253, 253);
  height: 75%;
  width: 95%;
  box-shadow: 0 0 5px #888888;
}
.leftCardContainer {
  width: 47%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 3%;
}
.rightCardContainer {
  width: 47%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 3%;
  background-color: rgb(247, 247, 247);
}
.postContainer {
  background-color: transparent;
  height: 61%;
  width: 100%;
  overflow: scroll;
}
.post_card {
  background-color: transparent;
  margin-top: 2%;
  margin-bottom: 4%;
  height: 10vh;
  width: 92%;
  border-radius: 2%;
  box-shadow: 0 0 3px #888888;
  margin-left: 3%;
  margin-right: 3%;
  overflow: hidden;
}
.header {
  color: black;
  font-weight: bold;
  margin-top: 5%;
  font-size: 4vh;
  margin-left: 3%;
  margin-bottom: 3%;
}
.subHeader {
  color: rgb(161, 160, 160);
  font-weight: bold;
  margin-top: 8%;
  font-size: 2vh;
  margin-left: 3%;
}
.image {
  width: 100%;
  height: 34%;
  object-fit: cover;
}
.infoCard {
  justify-content: center;
  margin-left: 3%;
  margin-bottom: 5%;
  margin-top: 4%;
}
.icon {
  width: 5%;
  height: auto;
  margin-right: 3%;
}
.label {
  font-weight: 500;
  font-size: 2.5vh;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.title {
  font-size: 2.6vh;
  font-weight: bold;
}
.body {
  font-weight: 500;
  font-size: 2.2vh;
  color: rgb(138, 138, 138);
}
.textbox {
  width: 90%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 3%;
  margin-top: 1%;
}
</style>
