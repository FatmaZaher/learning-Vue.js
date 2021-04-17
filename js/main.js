Vue.component('product', {
    tamplate: `
    <div class="product"> 
        <div class="row">
            <div class="col-5">
                <div class="product-image">
                    <img :src="image" :alt="altText"/>
                </div>
            </div>
            <div class="col-7">
                <div class="product-info">
                    <h1> {{ title }}</h1>
                    <p v-if = "inStock">In Stock</p>
                    <p v-else>Out of Stock</p>
                    <ul>
                        <li v-for= "detail in details"> {{ detail }}</li>
                    </ul>
                    <div class="color-box"
                        v-for="(variant, index) in variants"
                        :key="variant.variantId"
                        :style="{backgroundColor: variant.variantColor}"
                        @mouseover="updateProduct(index)">
                    </div>
                    <button @click="addToCart"
                            :disabled="!inStock"
                            :class="{disabledButton: !inStock}"
                            >Add ot Cart
                    </button>
                    <div class="cart">
                        <p>Cart ({{ cart }})</p>
                    </div>
                </div>
            </div>
        </div> 
    </div>`,
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
            cart: 0
        }   
    },
    methods: {
        addToCart: function() {
            this.cart += 1
        },
        updateProduct: function(index) {
            this.selectedVariant = index
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
        }
    }
    
})
var app = new Vue({
    el: '#app',  
})