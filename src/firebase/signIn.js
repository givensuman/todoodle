import app from './initializeApp'
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider,
    GithubAuthProvider,
} from 'firebase/auth'

const signIn = async providerSource => {
    const auth = getAuth()

    if (providerSource === 'Google') {
        const provider = new GoogleAuthProvider()
        let data = await signInWithPopup(auth, provider)
            .catch(err => console.error(err))
        return data
    }

    if (providerSource === 'Github') {
        const provider = new GithubAuthProvider()
        let data = await signInWithPopup(auth, provider)
            .catch(err => console.error(err))
        return data
    }
}

export default signIn