<template>
  <li class="card" @click="_click">
    <div class="typelogo">
      <img :src="typeitemlogo" alt="" class="image">
    </div>
    <div class="logo">
      <img :src="itemlogo" alt="" class="image">
    </div>
    <div class="content">
      <h2>{{ item.name }}</h2>
      <p class="description">
        {{ item.description }}
      </p>
      <div class="auther">
        <avatar
          :text="item.owner.toLowerCase()"
          :width="20"
          :height="20"
        ></avatar>
        <a href="#" target="_blank" @click.stop :title=" item.owner">{{ item.owner }}</a>
      </div>
      <div class="footer">
        <div class="left">
          <div class="comment" @click.stop="editComment">
            <Icon custom="icon-uncomment"/>
            <span>{{ item.reply_count.count }}</span>
          </div>
          <div class="star">
            <Icon custom="icon-unstar" />
            <span>{{ item.collect_count.upcount }}</span>
          </div>
        </div>
        <div class="price">
          <span>ATN</span>
          <span>{{ item.floor_price | priceFormat }}</span>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Card",
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  // computed: {
  //   logo() {
  //     return {
  //       backgroundImage: `url(${this.item.logo})`
  //     };
  //   }
  // },
  computed: {
    itemlogo() {
      if (this.item.outdate) {
        const logostr = this.item.logo;
        return logostr.substring(0, logostr.length - 4) + "-offline.png";
      }
      return this.item.logo;
    },
    typeitemlogo() {
      return (
        "https://ai-market-ui-img.oss-cn-hangzhou.aliyuncs.com/" +
        this.item.category +
        ".svg"
      );
    }
  },
  methods: {
    ...mapActions(["setTabsValue"]),
    _click() {
      this.setTabsValue("1");
      const { addr } = this.item;
      this.$router.push({
        name: "detail",
        params: {
          address: addr
        }
      });
    },
    editComment() {
      this.setTabsValue("0");
      const { addr } = this.item;

      this.$router.push({
        name: "detail",
        params: {
          address: addr
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.card {
  width: 280px;
  margin: 0 20px 20px 0;
  flex: 0 0 auto;
  background: #ffffff;
  // box-shadow: 3px 0 10px 0 rgba(200, 199, 232, 0.5);
  border: thin solid rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:nth-of-type(3n) {
    margin-right: 0;
  }

  &:hover {
    transform: translate3d(0, -2px, 0);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  .typelogo {
    margin-top: 6px;
    margin-left: 6px;
    border-radius: 4px;
    padding: 5px;
    width: 40px;
    height: 40px;
    background: #797af8;
    .image {
      width: 30px;
      height: 30px;
    }
  }

  .logo {
    margin-top: 12px;
    height: 150px;
    width: 280px;
    display: flex;
    justify-content: center;
    align-items: center;
    .image {
      width: 100%;
    }
  }

  .content {
    padding: 0 15px 13px;

    h2 {
      font-size: 18px;
      margin: 0 0 4px;
    }

    .description {
      margin: 0;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: 14px;
      color: #788091;
      line-height: 1.2;
    }

    .auther {
      margin: 20px 0;
      display: flex;
      align-items: center;

      .avatar {
        border-radius: 100%;
        overflow: hidden;
        box-shadow: none;
        margin-right: 6px;
      }

      a {
        text-overflow: ellipsis;
        overflow: hidden;
        color: #788091;
      }
    }

    .footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      // pointer-events: none;

      .left {
        display: flex;
        align-items: center;
      }

      .comment,
      .star {
        display: flex;
        align-items: center;

        span {
          margin-left: 3px;
          font-size: 12px;
          color: #c7c7c7;
          line-height: 1;
        }

        & /deep/ .ivu-icon {
          font-size: 16px;
          color: #c7c7c7;
        }
      }

      .comment {
        margin-right: 25px;
      }

      .price {
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;

        span {
          color: #ff5655;
          line-height: 1;

          &:first-of-type {
            font-size: 12px;
            margin-right: 5px;
          }

          &:last-of-type {
            font-size: 24px;
          }
        }
      }
    }
  }
}
</style>
