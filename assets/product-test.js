
if(!customElements.get('product-test')) {
    customElements.define(
        'product-test',
        class ProductTest extends HTMLElement {
            constructor() {
                super();
                this.currentVariant = current_variant
                this.color = this.currentVariant.option1
                this.size = this.currentVariant.option2
                this.currentMedia = productMedia
                this.productVariants = productVariants
                this.variantId = this.currentVariant.id
                this.elements = {
                    swiperWrapper: this.querySelector('.swiper-wrapper'),
                    colorInputs: this.querySelectorAll('input[type="radio"][data-colorInput="color-input"]'),
                    sizeSelector: this.querySelector('#size-selector'),
                    colorFeedback: this.querySelector('#product-test__feedback__color-feedback'),
                    sizeFeedback: this.querySelector('#product-test__feedback__size-feedback'),
                    miniThumbnailsGallery: this.querySelector('.mini-thumbnails-gallery'),
                    miniThumbnails: this.querySelectorAll('.mini-thumbnail'),
                    itemId: this.querySelector('#id'),
                    socialMedia: this.querySelectorAll('.fa-brands'),
                }

                const bigThumbnail = document.createElement('img')
                bigThumbnail.src = this.currentVariant

                this.elements.colorFeedback.textContent = this.currentVariant.option1
                this.elements.sizeFeedback.textContent = this.currentVariant.option2

                this.elements.colorInputs.forEach(colorInput => {
                    colorInput.addEventListener('change', this.handleColorInput.bind(this))
                })

                this.elements.sizeSelector.addEventListener('change', this.handleSizeSelection.bind(this))
                
                this.elements.miniThumbnailsGallery.addEventListener('click', (event) => {
                    if (event.target.classList.contains('mini-thumbnail')) {
                        const index = Array.from(this.elements.miniThumbnails).indexOf(event.target);
                        console.log(`the assigned index is: ${index}`)
                        this.handleMiniThumbnailClick(index);
                    } else if (event.target.classList.contains('mask')) {
                        const parentElement = event.target.parentNode;
                        const index = Array.from(this.elements.miniThumbnails).indexOf(parentElement)
                        this.handleMiniThumbnailClick(index);
                    }
                });

                this.elements.socialMedia.forEach(social => social.addEventListener('click', this.handleClickOnSocialMedia.bind(this, social) ))

            }

            handleColorInput(event) {
                const color = event.target.value
                this.color = color
                this.elements.colorFeedback.textContent = color
                console.log('current color is:', this.color)
                this.currentMedia = productMedia.filter(media => media.alt == this.color.toLowerCase())
                console.log('current media is:', this, this.currentMedia)

                const fragment = document.createDocumentFragment();

                /* swiper */
                this.currentMedia.forEach(media => {
                    const swiperSlide = document.createElement('div');
                    swiperSlide.classList.add('swiper-slide');
                    swiperSlide.classList.add('media-wrapper');
                
                    switch (media.media_type) {
                        case 'image':
                            const image = document.createElement('img');
                            image.src = media.src;
                            swiperSlide.appendChild(image);

                            
                            break;
                        case 'video':
                            const video = document.createElement('video');
                            video.src = media.src;
                            swiperSlide.appendChild(video);
                            break;
                        case 'external_video':
                            const externalVideoIframe = document.createElement('iframe');
                            externalVideoIframe.src = `https:/www.youtube.com/embed/${media.external_id}`;
                            swiperSlide.appendChild(externalVideoIframe);

                            
                            break;
                        case 'model':
                            const modelViewer = document.createElement('model-viewer');
                            modelViewer.setAttribute('src', media.model_src);
                            modelViewer.setAttribute('alt', media.alt);
                            modelViewer.setAttribute('auto-rotate', '');
                            modelViewer.setAttribute('camera-controls', '');
                            swiperSlide.appendChild(modelViewer);

                            
                            break;
                        default:
                            const unsupportedMedia = document.createElement('p');
                            unsupportedMedia.textContent = `Media type '${media.media_type}' is not supported.`;
                            swiperSlide.appendChild(unsupportedMedia);

                            
                            break;
                    }
                
                    fragment.appendChild(swiperSlide);
                });

                this.elements.swiperWrapper.innerHTML = ''
                this.elements.swiperWrapper.appendChild(fragment)

                /* mini gallery */
                this.elements.miniThumbnailsGallery.innerHTML = ''
                
                this.currentMedia.forEach(media => {

                    switch(media.media_type) {
                        case 'image':
                            const image = document.createElement('img')
                            image.src = media.src
                            image.classList.add('mini-thumbnail')
                            this.elements.miniThumbnailsGallery.appendChild(image)
                            break;
                            case 'video':
                                const video = document.createElement('video');
                                video.src = media.src;
                                video.classList.add('mini-thumbnail')
                                this.elements.miniThumbnailsGallery.appendChild(video);
                                break;
                            case 'external_video':
                                const iframeWraper = document.createElement('div')
                                const mask = document.createElement('div')
                                iframeWraper.classList.add('ext-video')
                                iframeWraper.classList.add('mini-thumbnail')
                                mask.classList.add('mask')
                                mask.textContent = 's'
                                const externalVideoIframe = document.createElement('iframe');
                                externalVideoIframe.src = `https:/www.youtube.com/embed/${media.external_id}`;
                                externalVideoIframe.classList.add('mini-thumbnail')
                                iframeWraper.appendChild(externalVideoIframe)
                                iframeWraper.appendChild(mask)
                                this.elements.miniThumbnailsGallery.appendChild(iframeWraper);   
                                break;
                            case 'model':
                                const modelViewer = document.createElement('model-viewer');
                                modelViewer.setAttribute('src', media.model_src);
                                modelViewer.setAttribute('alt', media.alt);
                                modelViewer.setAttribute('auto-rotate', '');
                                modelViewer.setAttribute('camera-controls', '');
                                modelViewer.classList.add('mini-thumbnail')
                                this.elements.miniThumbnailsGallery.appendChild(modelViewer);                          
                                break;
                            default:
                                const unsupportedMedia = document.createElement('p');
                                unsupportedMedia.textContent = `Media type '${media.media_type}' is not supported.`;
                                unsupportedMedia.classList.add('mini-thumbnail')
                                this.elements.miniThumbnailsGallery.appendChild(unsupportedMedia)
                                break;
                            }
                            
                })

                this.elements.miniThumbnails = this.querySelectorAll('.mini-thumbnail')
                this.printSelectedVariant()
            }

            handleSizeSelection(event) {
                const size = event.target.value
                this.size = size
                this.elements.sizeFeedback.textContent = size
                this.printSelectedVariant()
            }

            handleMiniThumbnailClick(index) {
                console.log(`clicking on miniature: ${index}`);
                if (swiper && swiper.slideTo) {
                    swiper.slideTo(index);
                } else {
                    console.error("Swiper instance not found or slideTo method doesn't exist.");
                }
            }

            printSelectedVariant() {

                this.selectedVariant = this.productVariants.find(variant => {
                    return variant.option1 === this.color && variant.option2 === this.size;
                });

                if (this.selectedVariant) {
                    this.currentVariant = this.selectedVariant
                    this.variantId = this.selectedVariant.id
                    this.elements.itemId.value = this.selectedVariant.id
                } else {
                    console.log('Variant not found for color and size');
                }
                console.log(this.currentVariant)
                console.log('variant id:', this.variantId)
            }

            handleClickOnSocialMedia(social) {
                console.log(social);
            
                let shareUrl = '';
                const url = encodeURIComponent(window.location.href);
            
                if (social.classList.contains('fa-facebook-f')) {
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                } else if (social.classList.contains('fa-twitter')) {
                    const text = encodeURIComponent('Check out this cool link!');
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
                } else if (social.classList.contains('fa-pinterest-p')) {
                    const imageUrl = encodeURIComponent('IMAGE_URL_TO_SHARE'); // Replace with your image URL
                    const description = encodeURIComponent('Description of your pinned image');
                    shareUrl = `https://pinterest.com/pin/create/button/?url=${url}&media=${imageUrl}&description=${description}`;
                } else {
                    console.log('no social media configured');
                    return;
                }
            
                window.open(shareUrl, '_blank');
            }
            
        }
    )
}