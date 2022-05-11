import {Component} from "../core/component";
import {apiService} from "../services/api.service";
import {TransformService} from "../services/transform.service";
import {renderPost} from "../templates/post.template";

export class PostsComponent extends Component {
    constructor(id, {loader}) {
        super(id);
        this.loader = loader
    }

    init() {
        this.$el.addEventListener('click', buttonHandler.bind(this))
    }

    async onShow() {
        this.loader.show()
        const fbData = await apiService.fetchPosts()
        if (fbData){
            const posts = TransformService.fbObjectToArray(fbData)
            const html = posts.map(post => renderPost(post, {withButton: true}))
            this.loader.hide()
            this.$el.insertAdjacentHTML('afterbegin', html.join(' '))
            const clearButton = document.getElementById('remove')
            clearButton.classList.remove('hide')
            document.getElementById('remove').addEventListener('click', removeAll.bind(this))
        }
        this.loader.hide()

    }

    onHide() {
        this.$el.innerHTML = ''
        const clearButton = document.getElementById('remove')
        clearButton.classList.add('hide')
    }
}

// function buttonHandler(event) {
//     const $el = event.target
//     const id = $el.dataset.id
//     if (id) {
//         let favorites = JSON.parse(localStorage.getItem('favorites')) || []
//
//         if (favorites.includes(id)){
//             $el.textContent = 'Save'
//             $el.classList.add('button-primary')
//             $el.classList.remove('button-danger')
//
//             favorites = favorites.filter(fId => fId !== id)
//         } else {
//             $el.textContent = 'Remove'
//             $el.classList.remove('button-primary')
//             $el.classList.add('button-danger')
//             favorites.push(id)
//         }
//
//     localStorage.setItem('favorites', JSON.stringify(favorites))
//     }
// }

async function buttonHandler(event) {
    const $el = event.target
    const id = $el.dataset.id
    if (id) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || []

        let fav = favorites.map(i => i.postId)
        if (fav.includes(id)){
            $el.textContent = 'Save'
            $el.classList.add('button-primary')
            $el.classList.remove('button-danger')

            favorites = favorites.filter(fId => fId.postId !== id)
        } else {
            $el.textContent = 'Remove'
            $el.classList.remove('button-primary')
            $el.classList.add('button-danger')
            const post = await apiService.fetchPostById(id)
            favorites.push({postId: id, title: post.title})
        }

        localStorage.setItem('favorites', JSON.stringify(favorites))
    }
}

async function removeAll(event){
    await apiService.clearAllPosts()
    alert('all notes were removed')
}





