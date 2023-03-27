<template>
  <div class="facade-comment-head">
    <div class="comment-head-name">{{review.name}}</div>
    <div class="comment-head-time">{{review.time}}</div>
  </div>
  <div class="comment-main-plate">{{ review.text }}</div>
</template>

<script>

export default {
  name: 'CommentBase',
  props: {
    review: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .facade-comment-head{
    display: flex;
    margin-bottom: 10px;
    .comment-head-name {
      margin-right: 8px;
      font-weight: 700;
      font-size: 14px;
      line-height: 19px;
    }
    .comment-head-time {
      font-size: 11px;
      line-height: 19px;
      color: #808080;
    }
  }
  .comment-main-plate {
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
</style>
