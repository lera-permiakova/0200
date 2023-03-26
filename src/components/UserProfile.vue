<template>
  <section class="user-profile-view">
    <div class="user-profile-view-header">
      <img alt="profile img" src="@/assets/img.png">
      <div class="user-profile-view-header-info">
        <h1 class="user-profile-view-header-info-name">{{ profileInfo.name }}</h1>
        <h2 class="user-profile-view-header-info-occupation">{{ profileInfo.occupation }}</h2>
        <p class="user-profile-view-header-info-description">{{ profileInfo.description }}</p>
        <article class="user-profile-view-header-info-services">
          <h4 class="user-profile-view-header-info-services-title">
            Services
          </h4>
          <ul class="user-profile-view-header-info-services-list">
            <li v-for="(count, name, key) in profileInfo.services"
                :key = key
                class="user-profile-view-header-info-services-list-item">
              <div class="wrapper" :class="`wrapper-${key + 1}`">
                <span>{{ name }}</span>
              </div>
              <span class="user-profile-view-header-info-services-list-item-count">
                {{ count }}
              </span>
            </li>
          </ul>
          <div class="user-profile-view-header-info-services-total">
            <span>Total</span>
            <span>{{ servicesTotal }}</span>
          </div>
        </article>
      </div>
    </div>
    <div class="user-profile-view-reviews">
      <div class="user-profile-view-reviews-head">
        <div class="user-profile-view-reviews-head-left-part">
          <h3>{{showAll ? 'All reviews' : 'Latest reviews'}}</h3>
          <h4 @click="showAll = !showAll">{{showAll ? 'Latest reviews' : 'All reviews'}}</h4>
        </div>
        <div class="user-profile-view-reviews-head-right-part">
          <img class="user-profile-view-reviews-head-right-part-like-img" alt="like" src="@/assets/like.svg">
          <div>{{ profileInfo.likesCount }}</div>
          <img class="user-profile-view-reviews-head-right-part-comment-img" alt="comment" src="@/assets/comment.svg">
          <div>{{ commentsCount }}</div>
        </div>
      </div>
      <ul class="user-profile-view-reviews-list">
        <transition-group name="list">
          <li class="user-profile-view-reviews-list-item" v-for="review in visibleReviews" :key="review.id">
            <div class="user-profile-view-reviews-list-item-head">
              <div class="user-profile-view-reviews-list-item-head-name">{{review.name}}</div>
              <div class="user-profile-view-reviews-list-item-head-time">{{review.time}}</div>
            </div>
            <div class="user-profile-view-reviews-list-item-text">{{ review.text }}</div>
          </li>
        </transition-group>
      </ul>
    </div>
    <form class="user-profile-view-add-comment"
          @keydown.enter.ctrl.prevent="handleClickSendMessage">
      <input class="user-profile-view-add-comment-name"
             :class="{alert: emptyInputAlert}"
             v-model.trim="inputName"
             type="text"
             @keydown.enter.exact.prevent
             @blur="emptyInputAlert = false"
             placeholder="Enter name"/>
      <textarea class="user-profile-view-add-comment-text"
                :class="{alert: emptyTextareaAlert}"
                v-model.trim="inputComment"
                :maxlength="1000"
                @blur="emptyTextareaAlert = false"
                placeholder="Enter comment"/>
      <button
        class="user-profile-view-add-comment-button"
        type="button"
        @click="handleClickSendMessage">
        Send a message
      </button>
    </form>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'UserProfile',
  data () {
    return {
      inputName: '',
      inputComment: '',
      showAll: false,
      displayedCommentsCount: 3,
      emptyInputAlert: false,
      emptyTextareaAlert: false
    }
  },
  computed: {
    ...mapGetters({
      profileInfo: 'getProfileInfo'
    }),
    commentsCount () {
      return this.profileInfo.reviews.length
    },
    visibleReviews () {
      return this.showAll ? this.profileInfo.reviews : this.profileInfo.reviews.slice(0, this.displayedCommentsCount)
    },
    servicesTotal () {
      return Object.values(this.profileInfo.services).reduce((acc, el) => el + acc, 0)
    }
  },
  methods: {
    ...mapMutations({
      setNewComment: 'setNewComment'
    }),
    handleClickSendMessage () {
      if (!this.inputName.length) {
        this.emptyInputAlert = true
      }
      if (!this.inputComment.length) {
        this.emptyTextareaAlert = true
      }
      if (this.inputName.length && this.inputComment.length) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' }
        const date = new Date().toLocaleString('en-US', options)
        const month = date.substr(0, 3)
        const day = date.substr(4, 2)
        const year = date.substr(8, 4)
        this.setNewComment({
          id: this.commentsCount + 1,
          name: this.inputName,
          text: this.inputComment,
          time: `${day} ${month} ${year}`
        })
        this.displayedCommentsCount++
        this.inputComment = ''
        this.inputName = ''
      }
    }
  }
}
</script>

<style scoped lang="scss">
 .user-profile-view {
   background-color: #fff;
   &-header {
     padding: 14px 19px 0 17px;
     box-sizing: border-box;
     display: flex;
     img {
       position: relative;
       z-index: 2;
       height: 124px;
       width: 124px;
       border-radius: 50%;
     }
     &-info {
       position: relative;
       width: 100%;
       box-sizing: border-box;
       padding: 7px 0 0 10px;
       &-name {
         margin-bottom: 2px;
         font-weight: 700;
         font-size: 16px;
         line-height: 20px;
       }
       &-occupation {
         margin-bottom: 5px;
         font-size: 12px;
         line-height: 20px;
         color: #808080;
       }
       &-description {
         padding: 5px 0 7px 44px;
         white-space: pre-wrap;
         background-color: #FFFBC8;
         border-radius: 5px;
         font-weight: 400;
         font-size: 14px;
         line-height: 20px;
         border: 1px solid #DADADA;
         box-sizing: border-box;

         position: absolute;
         left: -35px;
         right: 0;
         z-index: 1;
       }
       &-services {
         margin: 74px 3px 18px 0;
         font-size: 13px;
         &-title {
           margin-bottom: 15px;
           padding: 0 21px 8px 0;
           border-bottom: 1px solid #DADADA;
           line-height: 15px;
           text-align: right;
         }
         &-list {
           position: relative;
           margin-bottom: 15px;
           box-sizing: border-box;
           &::before {
             position: absolute;
             content: '';
             height: 100%;
             width: 1px;
             top: 0;
             left: 0;
             z-index: 2;
             background-color: rgba(#333333, .2);
           }
           &-item {
             display: flex;
             align-items: center;
             justify-content: space-between;
             line-height: 26px;
             white-space: pre;
             &:not(:last-child) {
               margin-bottom: 2px;
             }
             .wrapper {
               padding-left: 6px;
               border-radius: 0 3px 3px 0;
               &-1 {
                 width: 73%;
                 background-color: #B1E19B;
               }
               &-2 {
                 width: 20%;
                 background-color: #ACE2F8;
               }
               &-3 {
                 width: 7%;
                 background-color: #ACE2F8;
               }
             }
             &-count {
               padding: 0 38px;
               font-weight: 700;
               line-height: 15px;
             }
           }
         }
         &-total {
           padding: 8px 38px 0 0;
           display: flex;
           align-items: center;
           justify-content: space-between;
           font-size: 16px;
           line-height: 26px;
           font-weight: 700;
           border-top: 1px solid #DADADA;
         }
       }
     }
   }
   &-reviews {
     padding: 0 20px 6px;
     &-head {
       margin-bottom: 12px;
       display: flex;
       justify-content: space-between;
       align-items: center;
       &-left-part {
         display: inherit;
         align-items: inherit;
         h3 {
           margin-right: 8px;
           font-weight: 700;
           font-size: 16px;
           line-height: 16px;
         }
         h4 {
           font-size: 14px;
           line-height: 16px;
           text-decoration: underline;
           text-underline-offset: 2px;
           color: #005DA1;
           cursor: pointer;
         }
       }
       &-right-part {
         display: inherit;
         align-items: inherit;
         &-like-img {
           height: 13px;
           margin-top: 1px;
         }
         &-comment-img {
           margin-top: 2px;
           margin-left: 18px;
         }
         div {
           margin-left: 4px;
           font-size: 12px;
           line-height: 14px;
         }
       }
     }
     &-list {
       &-item {
         padding-bottom: 16px;
         &-head {
           display: flex;
           margin-bottom: 10px;
           &-name {
             margin-right: 8px;
             font-weight: 700;
             font-size: 14px;
             line-height: 19px;
           }
           &-time {
             font-size: 11px;
             line-height: 19px;
             color: #808080;
           }
         }
         &-text {
           position: relative;
           padding: 10px 20px;
           font-size: 14px;
           line-height: 19px;
           white-space: pre-wrap;
           background-color: #F2FBFF;
           border: 1px solid #C4CBCF;
           box-shadow: 0 4px 10px rgba(128, 128, 128, .1);
           &::before {
             position: absolute;
             content: '';
             top: -10px;
             left: 23px;
             width: 0;
             height: 0;
             border-bottom: 10px solid #C4CBCF;
             border-right: 10px solid transparent;
           }
           &::after {
             position: absolute;
             content: '';
             left: 24px;
             top: -7.6px;
             width: 0;
             height: 0;
             border-bottom: 9px solid #F2FBFF;
             border-right: 9px solid transparent;
           }
         }
       }
     }
   }
   &-add-comment {
     padding: 22px 20px 34px;
     display: flex;
     flex-direction: column;
     background-color: #F2F2F2;
     .alert {
       border-color: red;
     }
     &-name {
       margin-bottom: 20px;
       padding: 10px;
       border: 1px solid #000;
       border-radius: 1px;
       font-family:  Arial, Avenir, Helvetica, sans-serif;
       font-size: 14px;
       outline: none;
       box-sizing: border-box;
       &:focus {
         border-color: #0968bd;
       }
       &::placeholder {
         font-size: 14px;
       }
     }
     &-text {
       height: 65px;
       margin-bottom: 22px;
       padding: 10px;
       border: 1px solid #000;
       line-height: 19px;
       border-radius: 1px;
       box-sizing: border-box;
       font-family:  Arial, Avenir, Helvetica, sans-serif;
       font-size: 14px;
       resize: none;
       outline: none;
       &:focus {
         border-color: #0968bd;
       }
       &::placeholder {
         font-size: 14px;
       }
     }
     &-button {
       width: 280px;
       margin: 0 auto;
       padding: 12px 0;
       font-weight: 700;
       font-size: 16px;
       line-height: 21px;
       color: #333333;
       background-color: #FDD639;
       border: none;
       border-radius: 23px;
       cursor: pointer;
       box-sizing: border-box;
       transition: background-color .3s;
       &:hover {
         background-color: rgba(#FDD639, .88);
       }
       &:active {
         transform: scale(.99);
       }
     }
   }
   .list-move {
     transition: transform .2s;
   }
   .list-enter-from, .list-leave-to {
     opacity: 0;
     transform: translateY(-10px);
   }
   .list-enter-to, .list-leave-from {
     opacity: 1;
     transform: translateY(0);
   }
   .list-enter-active, .list-leave-active {
     transition: all .2s ease-in-out;
   }
   @media (max-width: 440px) {
     .user-profile-view-header {
       flex-direction: column;
       align-items: center;
       &-info {
         padding-top: 12px;
         padding-left: 0;
         text-align: center;
         &-description {
           position: static;
           padding-left: 2px;
         }
         &-services {
           text-align: left;
           margin-top: 12px;
         }
       }
     }
   }
 }
</style>
