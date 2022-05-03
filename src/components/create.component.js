import {Component} from "../core/component";
import {Form} from "../core/form";
import {Validators} from "../core/validators";
import {logPlugin} from "@babel/preset-env/lib/debug";

export class CreateComponent extends Component{
    constructor(id) {
        super(id);

        // this.form = null
    }

    init(){
        this.$el.addEventListener('submit', submitHandler.bind(this))

        this.form = new Form(this.$el, {
            title: [Validators.required],
            fulltext: [Validators.required, Validators.minLength(10)]
        })
    }
}

function submitHandler(event){
    event.preventDefault()

    if (this.form.isValid()){
        const formData = {
            type: this.$el.type.value,
            ...this.form.value()
        }
        console.log('submit', formData)
    } else {
        console.warn("form is invalid")
    }
}