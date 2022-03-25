import {createSlice , configureStore} from '@reduxjs/toolkit';

const mainComponentSlice = createSlice({
    name:'main-slice',
    initialState:{mainBackground:'' , mainLogo:'', initialTrailerKey:''},
    reducers:{
        changeMainBackground (state , action) {
            state.mainBackground = action.payload.mainNewBackground;
        },
        changeLogo (state, action) {
            state.mainLogo = action.payload.newLogo;
        },
        changeTrailerKey (state, action) {
            state.initialTrailerKey = action.payload.newTrailerKey
        }

    }
})

const trailerSlice = createSlice({
    name:'trailer-slice',
    initialState:{initialTrailerKey:'' , isTrailerOpen:false},
    reducers:{
        changeTrailerKey (state, action) {
            state.initialTrailerKey = action.payload.newTrailerKey
        },
        setIsTrailerOpen (state, action) {
            state.isTrailerOpen = action.payload.isTrailerOpen;
        }

    }
})

const searchSlice = createSlice({
    name:'search-slice',
    initialState:{isSearchOpen:false},
    reducers:{
        setIsSearchOpen (state, action) {
            state.isSearchOpen = action.payload.isSearchOpen;
        }

    }
})

const store = configureStore({reducer:{mainComponentSlice:mainComponentSlice.reducer , trailerSlice:trailerSlice.reducer, searchSlice:searchSlice.reducer}});

export const mainComponentSliceActions = mainComponentSlice.actions;
export const trailerSliceActions = trailerSlice.actions;
export const searchSliceActions = searchSlice.actions;

export default store;