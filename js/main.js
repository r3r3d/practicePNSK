Vue.component('product', {
    template: `<div class="product">

        <div class="product-image">
            <img alt="#" :src="image" :alt="altText">
        </div>
        <div class="product-info">
            <h1>{{ title }}</h1>
            <p>{{ description }}</p>
            <b><span class="sale" v-if="onSale">Sale -50%</span></b>
            <ul>
                <li v-for="detail in details">{{ detail }}</li>
            </ul>

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
            <div class="cart">
                <p>Cart({{ cart }})</p>
            </div>
            <button @click="addToCart"
                        v-bind:disabled="!inStock"
                        v-bind:class="{ disabledButton: !inStock }">Add to cart</button>
                        <button @click="removeFromCart">Remove from cart</button>
        </div>
</div>`,
    data(){
        return {
                product: "Socks",
                altText: "A pair of socks",
                link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
                selectedVariant: 0,
                brand: 'Vue Mastery ',
                description: "A pair of warm, fuzzy socks",
                onSale: true,
                details: ['80% cotton', '20% polyester', 'Gender-neutral'],
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
                this.cart += 1
            },
            removeFromCart() {
                this.cart -= 1
            },
            updateProduct(index) {
                this.selectedVariant = index;
                console.log(index);

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
            }

    }
})
let app = new Vue({
    el: '#app'
    })
