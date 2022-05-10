import {HeaderComponent} from "./components/header.component";
import {NavigationComponent} from "./components/navigation.component";
import {PostsComponent} from "./components/posts.component";
import {CreateComponent} from "./components/create.component";
import {FavouriteComponent} from "./components/favourite.component";
import {LoaderComponent} from "./components/loader.component";

new HeaderComponent('header')
const loader = new LoaderComponent('loader')
const navigation = new NavigationComponent ('navigation')
const create = new CreateComponent('create')
const posts = new PostsComponent('posts', {loader})
const favorite = new FavouriteComponent('favorite', {loader})


navigation.registerTabs([
    {name: 'create', component: create},
    {name: 'posts', component: posts},
    {name: 'favorite', component: favorite}
])