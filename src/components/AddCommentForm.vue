<template>
  <form class="add-comment-form-view"
        @keydown.enter.ctrl.prevent="handleClickSendMessage">
    <input class="add-comment-form-view-name"
           :class="{alert: emptyInputAlert}"
           v-model.trim="inputName"
           type="text"
           @keydown.enter.exact.prevent
           @blur="emptyInputAlert = false"
           placeholder="Enter name"/>
    <textarea class="add-comment-form-view-text"
              :class="{alert: emptyTextareaAlert}"
              v-model.trim="inputComment"
              :maxlength="1000"
              @blur="emptyTextareaAlert = false"
              placeholder="Enter comment"/>
    <button
      class="add-comment-form-view-button"
      type="button"
      @click="handleClickSendMessage">
      Send a message
    </button>
  </form>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'AddCommentForm',
  props: {
    commentsCount: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      inputName: '',
      inputComment: '',
      emptyInputAlert: false,
      emptyTextareaAlert: false
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
        this.$emit('onAdd')
        this.inputComment = ''
        this.inputName = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .add-comment-form-view {
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
</style>
