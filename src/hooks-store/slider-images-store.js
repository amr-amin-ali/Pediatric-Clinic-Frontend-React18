import { initStore } from "./store";

const configureSliderImagessStore = () => {
  const actions = {
    INITIATE_SLIDER_IMAGES: async (globalState, imagesList) => {
      globalState.sliderImages.images = imagesList;
      globalState.sliderImages.isInitiated = true;
      return globalState;
    },
    DELETE_IMAGE: (globalState, imageId) => {
      globalState.sliderImages.images=globalState.sliderImages.images.filter(c=>c.id !== imageId);
      return globalState;
    },
  };

  initStore(actions, {
    sliderImages: {
      images: [],
      isInitiated:false
    },
  });
};

export default configureSliderImagessStore;
