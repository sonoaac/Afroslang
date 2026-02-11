import { ChevronLeft, Heart, MessageCircle, Send, Bookmark } from 'lucide-react';
import { useState } from 'react';
import './LatestNews.css';

interface LatestNewsProps {
  onBack: () => void;
  interfaceLanguage: 'en' | 'fr';
}

export function LatestNews({ onBack, interfaceLanguage }: LatestNewsProps) {
  const isEnglish = interfaceLanguage === 'en';
  const [liked, setLiked] = useState(false);

  const post = {
    userName: 'Afroslang',
    fullName: 'Afroslang',
    profilePic: '/afroslang-logo.png',
    location: isEnglish ? 'Learning Languages' : 'Apprendre les langues',
    postDescription: isEnglish
      ? 'Welcome to Afroslang beta v1.0! 🎉'
      : 'Bienvenue dans Afroslang beta v1.0! 🎉',
    likedBy: ['Afroslang snc', 'Courtney'],
    likes: 11,
    postContent: isEnglish
      ? `🌍 Welcome to Afroslang Beta v1.0!

We're thrilled to launch the beta version of Afroslang! Here's what you need to know:

📱 CURRENT STATUS:
• Afroslang is in BETA stage - expect updates and improvements!
• User Profile Interface will be fully functional in the next update
• Many lessons are still being completed and optimized

🚀 COMING SOON:
• User Profile Interface (Next Update)
• Uncompleted Lessons (We're working on it!)
• Commenting System
• Chat & Messaging
• Friends Lists
• Leaderboards & Rankings

❓ NEED HELP?
Have any issues or feedback? Don't hesitate to reach out:
📧 Email us: afroslang@gmail.com

Thank you for being part of this journey! 🙌

#Afroslang #BetaLaunch #AfricanLanguages #Learning`
      : `🌍 Bienvenue dans Afroslang Beta v1.0!

Nous sommes ravis de lancer la version bêta d'Afroslang! Voici ce que vous devez savoir:

📱 STATUT ACTUEL:
• Afroslang est en phase BÊTA - attendez-vous à des mises à jour et des améliorations!
• L'interface du profil utilisateur sera pleinement fonctionnelle dans la prochaine mise à jour
• De nombreuses leçons sont encore en cours de finalisation et d'optimisation

🚀 À VENIR:
• Interface du Profil Utilisateur (Prochaine mise à jour)
• Leçons Incomplètes (Nous y travaillons!)
• Système de Commentaires
• Chat et Messagerie
• Listes d'Amis
• Classements et Scores

❓ BESOIN D'AIDE?
Vous avez des problèmes ou des commentaires? N'hésitez pas à nous contacter:
📧 Envoyez-nous un email: afroslang@gmail.com

Merci de faire partie de ce projet! 🙌

#Afroslang #LancementBeta #LanguesAfricaines #Apprentissage`,
  };

  const handleHeartClick = () => {
    setLiked(!liked);
  };

  return (
    <div className="latest-news-container">
      {/* Back Button and Header */}
      <div className="latest-news-header">
        <button onClick={onBack} className="back-button" aria-label="Go back">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1>{isEnglish ? 'Latest News' : 'Dernières Actualités'}</h1>
        <div className="header-spacer"></div>
      </div>

      {/* Main Content - Carousel-like Post */}
      <div className="latest-news-content">
        {/* Social Media Post */}
        <div className="social-post-wrapper">
          <div className="phone-body">
            {/* User Info Header */}
            <div className="user-info">
              <div className="user-img">
                <img src={post.profilePic} alt={post.userName} />
              </div>
              <div className="user-name">
                <h4>{post.userName}</h4>
                <span className="user-location">{post.location}</span>
              </div>
              <div className="post-btn">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>

            {/* Post Image */}
            <div
              className="post-image"
              style={{
                backgroundImage: `url(${post.profilePic})`,
              }}
            ></div>

            {/* Post Body */}
            <div className="post-body">
              {/* Icons/Actions */}
              <div className="icon-container">
                <div className="left">
                  <button
                    className={`icon-btn ${liked ? 'liked' : ''}`}
                    onClick={handleHeartClick}
                    aria-label="Like"
                  >
                    <Heart
                      className="w-6 h-6"
                      fill={liked ? 'currentColor' : 'none'}
                    />
                  </button>
                  <button
                    className="icon-btn"
                    aria-label="Comments"
                  >
                    <MessageCircle className="w-6 h-6" />
                  </button>
                  <button className="icon-btn" aria-label="Share">
                    <Send className="w-6 h-6" />
                  </button>
                </div>
                <div className="right">
                  <button className="icon-btn" aria-label="Bookmark">
                    <Bookmark className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Likes Count */}
              <div className="post-likes">
                <h4>
                  {isEnglish ? 'Liked by' : 'Aimé par'}{' '}
                  <button
                    className="likes-link"
                  >
                    {post.likedBy[0]} {isEnglish ? 'and' : 'et'}{' '}
                    <span className="likes-count">
                      {post.likes - 1} {isEnglish ? 'others' : 'autres'}
                    </span>
                  </button>
                </h4>
              </div>

              {/* Post Description */}
              <div className="post-desc">
                <h4>{post.userName}:</h4>
                <p className="post-caption">{post.postDescription}</p>
              </div>

              {/* View Comments Link */}
              <div className="comments-link-container">
                <button
                  className="comments-link"
                >
                  {isEnglish ? 'View all comments' : 'Voir tous les commentaires'}
                </button>
              </div>

              {/* Time Posted */}
              <h5 className="time-posted">
                {isEnglish ? 'Now' : 'Maintenant'}
              </h5>
            </div>
          </div>

          {/* Full Post Content Modal-like Overlay */}
          <div className="post-content-modal">
              <div className="modal-header">
                <button onClick={onBack} className="close-btn">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <h2>{isEnglish ? 'Beta Launch Announcement' : 'Annonce du Lancement Bêta'}</h2>
                <div className="header-spacer"></div>
              </div>

              <div className="modal-content">
                <div className="announcement-card">
                  <img src={post.profilePic} alt={post.userName} className="modal-avatar" />
                  <div className="announcement-header">
                    <h3>{post.userName}</h3>
                    <p className="announcement-meta">
                      {post.userName} • {isEnglish ? 'Just now' : 'À l\'instant'}
                    </p>
                  </div>

                  <div className="announcement-content">
                    <p className="announcement-text">{post.postContent}</p>
                  </div>

                  <div className="announcement-footer">
                    <div className="footer-stats">
                      <span className="stat">
                        <strong>{post.likes}</strong>{' '}
                        {isEnglish ? 'Likes' : 'J\'aimes'}
                      </span>
                      <span className="stat">
                        {isEnglish ? '10 Comments' : '10 Commentaires'}
                      </span>
                      <span className="stat">
                        {isEnglish ? '5 Shares' : '5 Partages'}
                      </span>
                    </div>

                    <div className="footer-actions">
                      <button
                        className={`action-btn ${liked ? 'active' : ''}`}
                        onClick={handleHeartClick}
                      >
                        <Heart
                          className="w-5 h-5"
                          fill={liked ? 'currentColor' : 'none'}
                        />
                        {isEnglish ? 'Like' : 'J\'aime'}
                      </button>
                      <button className="action-btn">
                        <MessageCircle className="w-5 h-5" />
                        {isEnglish ? 'Comment' : 'Commenter'}
                      </button>
                      <button className="action-btn">
                        <Send className="w-5 h-5" />
                        {isEnglish ? 'Share' : 'Partager'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Beta Features List */}
                <div className="features-section">
                  <h3>{isEnglish ? 'What\'s New in Beta' : 'Quoi de neuf dans la bêta'}</h3>
                  <div className="features-grid">
                    <div className="feature-card">
                      <span className="feature-icon">📚</span>
                      <h4>{isEnglish ? 'Learn' : 'Apprendre'}</h4>
                      <p>
                        {isEnglish
                          ? 'Master African languages with interactive lessons'
                          : 'Maîtrisez les langues africaines avec des leçons interactives'}
                      </p>
                    </div>
                    <div className="feature-card">
                      <span className="feature-icon">🏆</span>
                      <h4>{isEnglish ? 'Compete' : 'Concourir'}</h4>
                      <p>
                        {isEnglish
                          ? 'Climb the leaderboards and earn badges (Coming Soon)'
                          : 'Montez le classement et gagnez des badges (À venir)'}
                      </p>
                    </div>
                    <div className="feature-card">
                      <span className="feature-icon">👥</span>
                      <h4>{isEnglish ? 'Connect' : 'Se connecter'}</h4>
                      <p>
                        {isEnglish
                          ? 'Chat with friends and join a community (Coming Soon)'
                          : 'Discutez avec des amis et rejoignez une communauté (À venir)'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact Section */}
                <div className="contact-section">
                  <h3>{isEnglish ? 'Feedback & Support' : 'Commentaires et Support'}</h3>
                  <p>
                    {isEnglish
                      ? 'Have issues or suggestions? We\'d love to hear from you!'
                      : 'Vous avez des problèmes ou des suggestions? Nous aimerions avoir de vos nouvelles!'}
                  </p>
                  <a href="mailto:afroslang@gmail.com" className="email-link">
                    📧 afroslang@gmail.com
                  </a>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
