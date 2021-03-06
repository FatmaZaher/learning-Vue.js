Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
      <div class ="row">
        <div class="col-5 mb-5">
              <div class="product-image">
                  <img :src="image" />
              </div>
        </div> 
        <div class="col-7 mb-5">
              <div class="product-info">
                  <h1>{{ product }}</h1>
                  <p v-if="inStock">In Stock</p>
                  <p v-else>Out of Stock</p>
                  <p>Shipping: {{ shipping }}</p>
                  <ul>
                  <li v-for="detail in details">{{ detail }}</li>
                  </ul>

                  <div class="color-box"
                      v-for="(variant, index) in variants" 
                      :key="variant.variantId"
                      :style="{backgroundColor: variant.variantColor}"
                      @mouseover="updateProduct(index)"
                      >
                  </div> 

                  <button v-on:click="addToCart" 
                  :disabled="!inStock"
                  :class="{ disabledButton: !inStock }"
                  >
                  Add to cart
                  </button>
              </div> 
        </div>

        <div class="col-12">
          <product-tabs :reviews="reviews"></product-tabs>
        </div>


      </div>
    </div>
    `,
    data() {
        return {
            product: 'Socks',
            brand: 'Vue Mastery',
            altText: 'A pair of socks',
            selectedVariant: 0,
            details: ["80% cotton", "20% polyester", "Gender-neutral"],
            variants: [
                {
                    variantId: 2234,
                    variantColor: "green",
                    variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: "blue",
                    variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg',
                    variantQuantity: 0
                }
            ],
            reviews: []
        }   
    },
    methods: {
        addToCart: function() {
            this.$emit('add-to-cart',this.variants[this.selectedVariant].variantId)
        },
        updateProduct: function(index) {
            this.selectedVariant = index
        },
        addReview: function(value) {
            this.reviews.push(value)
        }
    },
    
    computed: {
        title() {
            return this.brand + ' ' + this.product 
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        shipping() {
            if (this.premium) {
              return "Free"
            }
            return 2.99
        }
    }
    
})
Vue.component('product-review', {
    template: `
    <div class="row">
      <div class="col-md-5">
        <form class="review-form" @submit.prevent="onSubmit">
        
          <p class="error" v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
              <li v-for="error in errors">{{ error }}</li>
            </ul>
          </p>

          <p>
            <label for="name">Name:</label><br>
            <input id="name" v-model="name" placeholder="Your Name">
          </p>
          
          <p>
            <label for="review">Review:</label><br>     
            <textarea id="review" v-model="review" placeholder="Your Review"></textarea>
          </p>
          
          <p>
            <label for="rating">Rating:</label>
            <select id="rating" v-model.number="rating">
              <option>5</option>
              <option>4</option>
              <option>3</option>
              <option>2</option>
              <option>1</option>
            </select>
          </p>
              
          <p>
            <input type="submit" value="Submit">  
          </p>    
        </form>
      </div>
    </div>
      

    `,
    data() {
      return {
        name: null,
        review: null,
        rating: null,
        errors: []
      }
    },
    methods: {
      onSubmit() {
        this.errors = []
        if(this.name && this.review && this.rating) {
          let productReview = {
            name: this.name,
            review: this.review,
            rating: this.rating
          }
          this.$emit('review-submitted', productReview)
          this.name = null
          this.review = null
          this.rating = null
        } else {
          if(!this.name) this.errors.push("Name required.")
          if(!this.review) this.errors.push("Review required.")
          if(!this.rating) this.errors.push("Rating required.")
        }
      }
    }
  })
  
  Vue.component('product-tabs', {
    props: {
      reviews: {
        type: Array,
        required: true
      }
    },
    template: `
      <div>
          <span class="tab" :class="{ activeTab: selectedTab === tab }"
                v-for="(tab, index) in tabs"
                @click="selectedTab = tab">{{ tab }}
          </span>
          <div class="mt-5" v-show="selectedTab === 'Reviews'">
            <p v-if="!reviews.length">There are no reviews yet.</p>
            <ul v-else>
                <li v-for="review in reviews">
                  <p>{{ review.name }}</p>
                  <p>Rating:{{ review.rating }}</p>
                  <p>{{ review.review }}</p>
                </li>
            </ul>
          </div>

          <div class="mt-5" v-show="selectedTab === 'Make a Review'">
            <product-review></product-review> 
          </div>
      </div>
      
    `,
    data() {
      return {
        tabs: ['Reviews', 'Make a Review'],
        selectedTab: 'Reviews'     
      }
    }
  })

  var app = new Vue({
    el: '#app',  
    data: {
        premium: true,
        cart: [],
    },
    methods:{
        updateCart(id){
            this.cart.push(id)
        }
    }
  })
