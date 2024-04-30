document.querySelector('.cancel').addEventListener('click', () => {
    window.location.reload(); 
});
document.getElementById('uploadAvatar').addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
            document.getElementById('avatarPreview').src = e.target.result;
        };

        reader.readAsDataURL(file); 
    }
});
function showModal(message, onConfirm) {
    const modal = document.getElementById('confirmationModal');
    document.getElementById('confirmationMessage').textContent = message;

    modal.style.display = 'block';

    document.getElementById('confirmButton').onclick = () => {
        onConfirm();
        closeModal();
    };

    document.getElementById('cancelButton').onclick = () => {
        closeModal();
    };
}

document.querySelectorAll('.save').forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        if (confirm("Are you sure you want to save the changes?")) {
            alert("Changes saved successfully!"); 
        }
    });
});

document.querySelectorAll('.cancel').forEach(button => {
    button.addEventListener('click', () => {
        if (confirm("Are you sure you want to cancel and discard all changes?")) {
            window.location.reload();
        }
    });
});
