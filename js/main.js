let app = new Vue({
    el: '#app',
    data: {
        product: "Socks",
        altText: "A pair of socks",
        link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
        inStock: true,
        brand:'Vue Mastery ',
        inventory: 5,
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
                variantQuantity: 10
            }
        ],

        sizes: [
            {
                sizeId: 2236,
                variantSize: 'S, M, L, XL, XXL'
            }],

        cart: 0,
        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
        },

            selectedVariant: 0,
        },
        computed:{
        title() {
            return this.brand + '' + this.product;
        },
        image() {
                return this.variants[this.selectedVariant].variantImage;
        },
            inStock(){
                return this.variants[this.selectedVariant].variantQuantity
            }

        },
    methods: {
        addToCart() {
            this.cart += 1
        },
        removeFromCart(){
            this.cart -= 1
        }

    },







    })
