export class Cart{
    cartBox = []; //объекты {position:{item}, ordered:{}}
    arrayForCart = [];

    //если есть такое имя - накрутим его счётчик, а если нету - добавим полностью
    //элементов массива должно быть не более, чем товаров. Счётчик корзины считается от общего кол-ва заказанных штук

    addToCart(itemPlusOrder = {position:{name:"Рыба-имя"}, ordered:{XL:1, XXL:2}}){
        // addToCart вызывается в Item.js, строка 18
        // 1. Есть ли уже такой товар?
        // да - наслаиваем, нет - просто пушим
        if (this.cartBox.length === 0){      // корзина пуста ? смело пушим!
            this.cartBox.push(itemPlusOrder)
        }
        else {
            let match = this.cartBox.find(cartEl => {
                if (cartEl.position.name === itemPlusOrder.position.name){ //если с таким именем элемент есть - наслаиваем
                    return cartEl
                }
            });
            if (match) {    // совпадения по имени есть? Да - наслаиваем
                this.appendNewOrder(itemPlusOrder.ordered, match.ordered)
            } else {        // совпадения по имени есть? Нет - смело пушим!
                this.cartBox.push(itemPlusOrder)
            }
        }
        console.log(this.cartBox)
    };

    //убавить на 1 позицию данного товара - продумать, как быть с галками
    removeOne(){

    };

    //сложить счётчики у всех товаров в корзине
    totalItems(){
        let totalItems = 0;
        this.cartBox.forEach(el => {
            let sizesSum = Object.values(el.ordered).reduce((start, item) => {
                return start + item
            })
            totalItems += sizesSum;
        })
        //console.log(`totalItems: ${totalItems}`)
        return totalItems;
    };

    //сложить цены у всех товаров в корзине, перемножив сумму размеров в ordered на цену товара
    totalPrice(){
        let totalPrice = 0;
        this.cartBox.forEach(el => {
            let sizesSum = Object.values(el.ordered).reduce((start, item) => {
                return start + item
            })
            totalPrice += sizesSum * el.position?.price;
            //console.log(`el.position?.price: ${el.position?.price}`)
        })
        //console.log(`totalPrice: ${totalPrice}`)
        return totalPrice;
    };

    //генератор промокода - переписать!!!
    promoCodeGen(){
        let pCode = "R1A2N3O4V5A6T7O8";

        return pCode;
    };

    appendNewOrder(newOrderObj, oldOrderObj){ //наложить новое кол-во заказанного поверх старого
        if (!newOrderObj || !oldOrderObj) {
            return false
        } else {
            Object.keys(newOrderObj).forEach(key => { //----вариант с Object.keys ------------
                if (oldOrderObj[key]) {
                    oldOrderObj[key] += newOrderObj[key]
                } else {
                    oldOrderObj[key] = newOrderObj[key]
                }
            })
        }
        return oldOrderObj
    };

    adapter(){ // адаптировать наш сложный массив cartBox под нужды Корзины для удобства показа в виде таблицы
        this.cartBox.forEach(complexItem => {
            Object.keys(complexItem.ordered).forEach(size => {
                this.arrayForCart.push({item:complexItem.position, size, amount:complexItem.ordered[size]})
            })
        })
        console.log(this.arrayForCart)
        return this.arrayForCart
    }
}

/*let c = new Cart();
*/
