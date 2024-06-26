document.addEventListener('DOMContentLoaded', () => {
    // See More/Less Button Functionality
    const seeMoreBtn = document.getElementById('seeMoreBtn');
    const settingsBtn = document.getElementById('settingsBtn');

    seeMoreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const isHidden = settingsBtn.style.display === 'none' || settingsBtn.style.display === '';
        settingsBtn.style.display = isHidden ? 'block' : 'none';
        seeMoreBtn.querySelector('h3').textContent = isHidden ? 'See Less' : 'See More';
        seeMoreBtn.querySelector('i').classList.toggle('fa-caret-down', !isHidden);
        seeMoreBtn.querySelector('i').classList.toggle('fa-caret-up', isHidden);
    });

    // Active Menu Item Based on Page
    const currentPath = window.location.pathname.split('/').pop();
    document.querySelectorAll('.leftSideMenuItem').forEach(item => {
        if (item.getAttribute('href') === currentPath) {
            item.classList.add('active-menu');
        }
        item.addEventListener('click', () => {
            document.querySelectorAll('.leftSideMenuItem').forEach(i => i.classList.remove('active-menu'));
            item.classList.add('active-menu');
        });
    });

    // Scrollbar Progress Indicator
    const progressBar = document.getElementById('progressBar');
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    window.addEventListener('scroll', () => {
        progressBar.style.height = `${(window.pageYOffset / totalHeight) * 100}%`;
    });

    // Toggle See More Button for Feed Titles
    document.querySelectorAll('.main .feed .title p').forEach(title => {
        if (title.textContent.length > 150) {
            const originalText = title.textContent;
            const truncatedText = `${originalText.slice(0, 150)}...`;
            const toggleBtn = document.createElement('span');
            toggleBtn.classList.add('toggle-btn');
            toggleBtn.textContent = 'See More';
            title.textContent = truncatedText;
            title.appendChild(toggleBtn);

            toggleBtn.addEventListener('click', () => {
                const isSeeMore = toggleBtn.textContent === 'See More';
                title.textContent = isSeeMore ? originalText : truncatedText;
                toggleBtn.textContent = isSeeMore ? 'See Less' : 'See More';
                title.appendChild(toggleBtn);
            });
        }
    });

    // Event Delegation for Feed Actions
    document.addEventListener('click', (event) => {
        const target = event.target;

        // Toggle Comments Section
        if (target.matches('.fa-comment')) {
            const feed = target.closest('.feed');
            const commentsSection = feed.querySelector('.comments-section');
            commentsSection.classList.toggle('active');
        }

        // Like Button Functionality
        if (target.matches('.fa-heart')) {
            const likeCount = target.nextElementSibling;
            let count = parseInt(likeCount.textContent);
            target.classList.toggle('liked');
            likeCount.textContent = target.classList.contains('liked') ? ++count : --count;
        }

        // Bookmark Button Functionality
        if (target.matches('.fa-bookmark')) {
            target.classList.toggle('blue-bookmark');
        }

        // Share Popup Functionality
        if (target.matches('.fa-share')) {
            const feed = target.closest('.feed');
            const sharePopup = feed.querySelector('.share-popup');
            sharePopup.style.display = sharePopup.style.display === 'block' ? 'none' : 'block';
        }

        // Copy Link to Clipboard
        if (target.matches('#copyLink')) {
            event.preventDefault();
            const dummy = document.createElement('textarea');
            document.body.appendChild(dummy);
            dummy.value = window.location.href;
            dummy.select();
            document.execCommand('copy');
            document.body.removeChild(dummy);
            alert('Link copied to clipboard!');
        }

        // Close Share Popup When Clicking Outside
        if (!target.closest('.feed .fa-share, .feed .share-popup')) {
            document.querySelectorAll('.share-popup').forEach(popup => {
                popup.style.display = 'none';
            });
        }

        // Post Comment Button Click
        if (target.matches('.comments-section button')) {
            const commentsSection = target.closest('.comments-section');
            const textarea = commentsSection.querySelector('textarea');
            if (textarea.value.trim() !== '') {
                textarea.value = '';
                const commentCount = commentsSection.closest('.feed').querySelector('.comment-count');
                commentCount.textContent = parseInt(commentCount.textContent) + 1;
            }
        }
    });

    // Submit Comment on Enter
    document.querySelectorAll('.comments-section textarea').forEach(textarea => {
        textarea.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                const feed = textarea.closest('.feed');
                const postCommentButton = feed.querySelector('.comments-section button');
                postCommentButton.click();
            }
        });
    });
});
// Comment popUP starts here
document.addEventListener('DOMContentLoaded', () => {
    // Other existing code...

    // Show comments popup
    document.querySelectorAll('.see-comments-btn').forEach(button => {
        button.addEventListener('click', () => {
            const feed = button.closest('.feed');
            const popup = feed.querySelector('.comment-popup');
            popup.style.display = 'flex';
        });
    });

    // Close comments popup
    document.querySelectorAll('.close-popup').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            const popup = closeBtn.closest('.comment-popup');
            popup.style.display = 'none';
        });
    });

    // Post comment and add to popup
    document.addEventListener('click', (event) => {
        const target = event.target;

        if (target.matches('.comments-section button')) {
            const commentsSection = target.closest('.comments-section');
            const textarea = commentsSection.querySelector('textarea');
            if (textarea.value.trim() !== '') {
                const feed = target.closest('.feed');
                const profilePicSrc = feed.querySelector('.profile-pic img').src;
                const profileName = feed.querySelector('.info h3').textContent;
                const commentText = textarea.value.trim();

                const newComment = document.createElement('div');
                newComment.classList.add('comment');
                newComment.innerHTML = `
                    <div class="comment-profile-pic">
                        <img src="${profilePicSrc}" alt="">
                    </div>
                    <div class="comment-info">
                        <h4>${profileName}</h4>
                        <p>${commentText}</p>
                    </div>
                `;

                const popup = feed.querySelector('.comment-popup .comments-list');
                popup.appendChild(newComment);

                textarea.value = ''; // Clear the textarea
                const commentCount = feed.querySelector('.comment-count');
                commentCount.textContent = parseInt(commentCount.textContent) + 1;
            }
        }
    });

    // Existing code for other functionalities...
});

// Comment popUP ends here
// right side bar Serach box starts
document.getElementById('search-box').addEventListener('input', function() {
    let filter = this.value.toLowerCase();
    let friends = document.querySelectorAll('.friends-cont .friend');
    
    friends.forEach(function(friend) {
        let friendName = friend.querySelector('h3').textContent.toLowerCase();
        if (friendName.includes(filter)) {
            friend.style.display = '';
        } else {
            friend.style.display = 'none';
        }
    });
});


// right side bar Serach box ends
// save scroll position starts
document.addEventListener('DOMContentLoaded', () => {
    const profileLink = document.getElementById('profileLink');

    // Save the scroll position before navigating away
    profileLink.addEventListener('click', (event) => {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        localStorage.setItem('scrollPosition', scrollPosition);
    });

    // Restore the scroll position if it exists in localStorage
    const savedScrollPosition = localStorage.getItem('scrollPosition');
    if (savedScrollPosition) {
        window.scrollTo(0, savedScrollPosition);
    }
});

// save scroll position ends