import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Secure from './Secure'

export default createStore({
  state: {
    profileInfo: {
      name: 'Eva Jonson',
      occupation: 'Sales Manager',
      description: 'I will find the best offers for you.\nMy services are absolutely free.',
      services: {
        'Manual tour booking': 11,
        'Package tours': 3,
        Hotels: 1
      },
      likesCount: 131,
      reviews: [
        {
          id: 14,
          name: 'Samuel Jackson',
          time: '13 Apr 2022',
          text: 'Hey Eva! You\'re cool. Nice pic!'
        },
        {
          id: 13,
          name: 'Angela Deimon',
          time: '10 Apr 2022',
          text: 'Thanks for your services! We really liked the ocean view room.\nWe hope to cooperate in the near future. We are sure you will do everything to make our next holiday fantastic.'
        },
        {
          id: 12,
          name: 'Ronald Harris',
          time: '8 Apr 2022',
          text: 'Eva, hello! There is such a question: How can I contact you if I am abroad in roaming?'
        },
        {
          id: 11,
          name: 'Kaleb Dorsey',
          time: '6 Apr 2022',
          text: 'Black. I\'d love to see a video of how it works.'
        },
        {
          id: 10,
          name: 'Natalia Bullock',
          time: '1 Apr 2022',
          text: 'Fun work you have here.'
        },
        {
          id: 9,
          name: 'Katherine Sykes',
          time: '29 Mar 2022',
          text: 'Such experience, many typography, so excellent'
        },
        {
          id: 8,
          name: 'Valerie Mckay',
          time: '24 Mar 2022',
          text: 'This is fresh work.'
        },
        {
          id: 7,
          name: 'Homer James',
          time: '20 Mar 2022',
          text: 'Beastly shot!!'
        },
        {
          id: 6,
          name: 'Osian Shelton',
          time: '15 Mar 2022',
          text: 'Playfulness, type, shot, work – strong'
        },
        {
          id: 5,
          name: 'Nora Barrett',
          time: '11 Mar 2022',
          text: 'Such appealing.'
        },
        {
          id: 4,
          name: 'Elena Hopkins',
          time: '8 Mar 2022',
          text: 'This is alluring and splendid!!'
        },
        {
          id: 3,
          name: 'Claire Vega',
          time: '2 Mar 2022',
          text: 'Just classic!'
        },
        {
          id: 2,
          name: 'Marina Conway',
          time: '20 Feb 2022',
          text: 'Vastly fab, friend.'
        },
        {
          id: 1,
          name: 'Bethany Delgado',
          time: '11 Jan 2022',
          text: 'I think clients would love this.'
        }
      ]
    }
  },
  getters: {
    getProfileInfo: state => state.profileInfo
  },
  mutations: {
    setNewComment: (state, comment) => state.profileInfo.reviews.unshift(comment)
  },
  plugins: [
    createPersistedState({
      key: 'session',
      storage: {
        getItem: (key) => Secure.get(key),
        setItem: (key, value) => Secure.set(key, value),
        removeItem: (key) => Secure.remove(key)
      }
    })
  ]
})
