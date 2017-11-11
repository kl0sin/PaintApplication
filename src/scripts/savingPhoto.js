const savePhotoButton = document.querySelector('.save-photo');
savePhotoButton.addEventListener('click', savePhoto);

function savePhoto() {
    const data = canvas.toDataURL('image/jpeg');
    savePhotoButton.setAttribute('download', 'my-picture');
    savePhotoButton.href = data;
}
