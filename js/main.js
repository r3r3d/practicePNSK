let eventBus = new Vue()
Vue.component('product-details', {
    props: {
        details: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <ul>
      <li v-for="detail in details">{{ detail }}</li>
    </ul>
  `
})

Vue.component('product', {
        props: {
            premium: {
                type: Boolean,
                required: true
            }
        },


    template: `<div class="product">
       


        <div class="product-image">
            <img alt="#" :src="image" :alt="altText">
        </div>
        <div class="product-info">
            <h1>{{ title }}</h1>
            <p>Shipping: {{ shipping }}</p>
            <p>{{ description }}</p>
            <b><span class="sale" v-if="onSale">Sale -50%</span></b>
            

        <p class="avSize">Size available</p>
            <div v-for="size in sizes" :key="size.sizes">
                <p>{{ size.variantSize}}</p>
            </div>
            <div class="color-box"
                 v-for="(variant, index) in variants"
                 :key="variant.variantId"
                 :style="{ backgroundColor:variant.variantColor }"
                 @mouseover="updateProduct(index)"
            ></div>



            <p v-if="inStock">In stock</p>
            <p v-else-if="inStock <= 10 && inStock > 0">Almost sold out!</p>
            <p v-else style="text-decoration: line-through">Out of Stock</p>

            <a href="link"> More products like this</a>
            <div id ="but">
            <button 
            v-on:click="addToCart":disabled="!inStock"
              :class="{ disabledButton: !inStock }"> Add to cart </button><br>
            <button 
            v-on:click="removeToCart">Remove from cart</button>
                        
                        </div>
            

                        
        </div>
        <product-tabs :reviews="reviews" :shipping="shipping" :details="details"></product-tabs>
        <div>


</div>

</div>`,
    data(){
        return {
                product: "Socks",
                details: ['80% cotton', '20% polyester', 'Gender-neutral'],
                altText: "A pair of socks",
                link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
                selectedVariant: 0,
                brand: 'Vue Mastery ',
                description: "A pair of warm, fuzzy socks",
                onSale: true,
                reviews: [],
            variants: [
                    {
                        variantId: 2234,
                        variantColor: 'green',
                        variantImage: "./assets/vmSocks-green-onWhite.jpg",
                        variantQuantity: 10
                    },
                    {
                        variantId: 2235,
                        variantColor: 'blue',
                        variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                        variantQuantity: 0
                    }
                ],

                sizes: [
                    {
                        sizeId: 2236,
                        variantSize: 'S, M, L, XL, XXL'
                    }],

                cart: 0,
                }
        },
        methods:{
            addToCart() {
                this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
            },

            removeToCart() {
                this.$emit('remove-to-cart', this.variants[this.selectedVariant].variantId)
                    .$emit('on-message', '????????????')
            },
            updateProduct(index) {
                this.selectedVariant = index;
                console.log(index);

            },
            addReview(productReview) {
                this.reviews.push(productReview)
            }




        },
        computed:{
        title() {
                return this.brand + ' ' + this.product;
            },
            image() {
                return this.variants[this.selectedVariant].variantImage;
            },
            inStock(){
                return this.variants[this.selectedVariant].variantQuantity
            },
            shipping() {
                if (this.premium) {
                    return "Free";
                } else {
                    return 2.99
                }
            }

    },
    mounted() {
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview)
        })
    }

})

Vue.component('product-review', {
    template: `

  <form class="review-form" @submit.prevent="onSubmit">
  <p v-if="errors.length">
 <b>Please correct the following error(s):</b>
 <ul>
   <li v-for="error in errors">{{ error }}</li>
 </ul>
</p>
 <p>
   <label for="name">Name:</label>
   <input id="name" v-model="name" placeholder="name">
 </p>

 <p>
   <label for="review">Review:</label>
   <textarea id="review" v-model="review"></textarea>
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
 <p>Would you recommend this product?</p>
                    <div>
                        <label for="picked">yes</label>
                        <input type="radio" value="yes" v-model="picked">
                        <label for="picked">no</label>
                        <input type="radio" value="no" v-model="picked">
                    </div>
                </p>

   <input type="submit" value="Submit"> 
 </p>

</form>

 `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            picked: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if(this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    picked: this.picked
                }
                eventBus.$emit('review-submitted', productReview);
                eventBus.$emit("on-message", "?????????? ????????????????????");
                this.name = null
                this.review = null
                this.rating = null
                this.picked = null
            } else {
                if(!this.name) this.errors.push("Name required.")
                if(!this.review) this.errors.push("Review required.")
                if(!this.rating) this.errors.push("Rating required.")
                if(this.picked) this.errors.push("Picked required")
            }
        }

    }

})
Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,

            required: true
        },
        shipping: {
            required: true
    },
        details: {
            type: Array,
            required: true
        }},
    template: `
   <div>    
    <ul>
      <span class="tab"
            :class="{ activeTab: selectedTab === tab }" 
            v-for="(tab, index) in tabs" 
            @click="selectedTab = tab"
            :key="tab"
      >{{ tab }}</span>
    </ul> 
    <div v-show="selectedTab === 'Reviews'">
      <p v-if="!reviews.length">There are no reviews yet.</p>
      <ul>
        <li v-for="review in reviews">
        <p>{{ review.name }}</p>
        <p>Rating: {{ review.rating }}</p>
        <p>{{ review.review }}</p>
        </li>
      </ul>
    </div>
    <div v-show="selectedTab === 'Make a Review'">
      <product-review></product-review>
    </div>
    <div v-show="selectedTab === 'Shipping'">
      <p>{{ shipping }}</p>
    </div>
    <div v-show="selectedTab === 'Details'">
      <ul>
                <li v-for="detail in details">{{ detail }}</li>
            </ul>
    </div>
  </div>`,
    data() {
        return {

            tabs: ['Reviews', 'Make a Review', 'Shipping', 'Details'],
            selectedTab: 'Reviews'  // ?????????????????????????????? ?? ?????????????? @click
        }
    }
})
Vue.component('info-tabs', {
    props: {
        shipping: {
            required: true
        },
        details: {
            type: Array,
            required: true
        }
    },
    template: `
      <div>
      
        <ul>
          <span class="tabs" 
                :class="{ activeTab: selectedTab === tab }"
                v-for="(tab, index) in tabs"
                @click="selectedTab = tab"
                :key="tab"
          >{{ tab }}</span>
        </ul>
    
      </div>
    `,
    data() {
        return {
            tabs: ['Shipping', 'Details'],
            selectedTab: 'Shipping'
        }
    }
})




let app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },
        removeCart(id) {
            for (let i = this.cart.length - 1; i >= 0; i--) {
                if (this.cart[i] === id) {
                    this.cart.splice(i, 1);
                }
            }
        }
    },
})

