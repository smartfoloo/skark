document.addEventListener('DOMContentLoaded', () => {
  const playlistCards = document.querySelectorAll('.playlist-card');
  const playlistRows = document.querySelectorAll('.playlist-row');
  const mainContent = document.querySelectorAll('.main-content');
  const sidebar = document.querySelectorAll('.sidebar');
  const musicContainer = document.getElementById('music-container');
  const audio = document.getElementById('audio');
  const playBtn = document.getElementById('play');
  const playPlaylistBtn = document.getElementById('playPlaylist');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const progress = document.getElementById('progress');
  const progressContainer = document.getElementById('progress-container');
  const title = document.getElementById('title');
  const cover = document.getElementById('cover');
  const queueList = document.getElementById('queue-list');
  const likeBtn = document.getElementById('like-btn');
  const shuffleBtn = document.getElementById('shuffle-btn');
  const installApp = document.getElementById('installApp');
  const queueButton = document.getElementById('queue-btn');
  const queueContainer = document.getElementById('queue-container');
  const urlParams = new URLSearchParams(window.location.search);

  const playlistId = urlParams.get('id');

  let playlists = {
    'liked-songs': [],
    'j-pop': ['怪物', 'ハルジオン', 'ハルカ', '夜に駆ける', 'あの夢をなぞって', 'アンコール', '勇者', 'heart-beat', 'ラブレター', '優しい彗星', 'たぶん', 'もしも命が描けたら', 'セブンティーン', 'もう少しだけ', '三原色', '祝福', 'ミスター', 'アドベンチャー', 'romance', '好きだ', 'アイドル', 'night-dancer', 'ヒロイン', 'nagisa', '蕾', '怪獣の花唄', '世界の秘密', '不可幸力', 'napori', 'そんなbitterな話', '花占い', 'chainsaw-blood', 'odoriko', 'odoriko-dazbee-cover', 'sleepwalk', 'overdose', 'フライデー・ナイト', '猿芝居', '白日', 'カメレオン', '一途', 'boy', '青のすみか', '打上花火', '最高到達点', 'habit', '阿修羅ちゃん', 'うっせえわ'],
    'siglikore': ['youre-too-slow', 'hyptonic-data'],
    'phonk': ['metamorphosis', 'rapture', 'close-eyes', 'lovely-bastards', 'memory-reboot', 'devil-eyes', 'sahara', 'rave', 'aircraft', 'rainstorm', 'shadow', 'psycho-cruise', 'midnight', 'baixo', 'classical-phonk', 'ghost!', 'gigachad-theme', 'eggstreme-duck-phonk', 'brazilian-phonk-mano', 'brazilian-danca-phonk', 'unholy', 'murder-in-my-mind', 'a-million-ways-to-murder', 'scopin', 'live-another-day', 'murder-plot', 'tokyo-drift', 'avoid-me', 'neon-blade', 'montagem-celestial-de-atenas'],
    'gaming-tracks': ['metamorphosis', 'close-eyes', 'close-eyes-sped-up', 'rave', 'chug-jug-with-you', 'live-another-day', 'murder-plot', 'tokyo-drift'],
    'hits-de-internet': ['after-dark', 'my-ordinary-life', 'kerosene', 'past-lives', 'gigachad-theme', 'night-dancer', 'lovely-bastards', 'all-my-fellas'],
    'meme-songs': ['last-rizzmas-i-gave-you-my-gyatt', 'indian-sleigh-ride-remix', 'indian-last-christmas-remix', 'king-on-a-budget-bk', 'whopper', 'nom-nom-nom-nom-nom-nom-nom', 'peppa-pig', 'loud-indian-music', 'careless-whisper', 'soviet-anthem', 'shimmy-shimmy-ay'],
    'slowed-and-reverbed': ['close-eyes-slowed-reverb', 'metamorphosis-slowed-reverb', 'living-life-in-the-night-slowed', 'lovely-bastards-slowed', 'memory-reboot-slowed'],
    'lofi-jazz': ['from-the-start', 'cupid', 'circus', 'that-kyoto-vibe', 'brazilian-beach-rumba', 'kyoto-nights', 'cactus-cafe', 'coffee-moments', 'jazz-in-my-coffee', 'sushi'],
    'holiday-party': ['last-rizzmas-i-gave-you-my-gyatt', 'indian-sleigh-ride-remix', 'indian-last-christmas-remix', 'mariahcarey', 'snowman', 'carol-of-the-bells', 'christmas-eve-==-sarajevo'],
    'mix': ['paint-the-town-red', 'somebody-that-i-used-to-know', 'somebodys-watching-me', 'ballin', 'bad-habit', 'luxury', 'everybody-wants-to-rule-the-world', 'the-box', 'the-perfect-girl'],
    'rap-mix': ['blueberry-faygo', 'lovin-on-me', 'all-girls-are-the-same', 'the-box', 'ballin', 'fkumean', 'no-role-modelz', 'solo', 'bad', 'what-are-you-so-afraid-of', 'chain-gang', 'wet-dreamz', 'passionfruit', 'teenage-fever', 'i-hate-police', 'great-gatsby', 'butterfly-effect', 'space-cadet', 'zeze', 'not-fair', '223s', 'look-back-at-it', 'humble', 'like-this', 'overtime', 'rockstar', 'swervin', 'got-it-on-me', 'wat-u-want-2', 'frick-love'],
    'pop-mix': ['paint-the-town-red', 'somebody-that-i-used-to-know', 'somebodys-watching-me', 'ballin', 'bad-habit', 'sleepwalker', 'luxury', 'everybody-wants-to-rule-the-world', 'the-box', 'the-perfect-girl'],
    'classical': ['la-campanella', 'violin-concerto-in-e-minor', 'adagio-albinoni', 'trio-no-2-in-e-minor', 'moonlight-sonata'],
    'national-anthems': ['soviet-anthem', 'heil-dir-im-siegerkranz', 'horst-wessel-lied', 'deutschlandlied', 'la-marseillaise'],
    'todays-top-hits': ['greedy', 'it-girl', 'ecstasy', 'moonlight', 'only-in-my-mind', 'strangers', 'smooth-operator-(tiktok-remix)'],
    'drake-mix': ['passionfruit', 'teenage-fever', 'idgaf-(frick)'],
    'xxxtentacion-mix': ['sad!', 'bad', 'frick-love'],
    'chill-chill': ['passionfruit', 'bad-habit', 'snowman', 'moonlight', 'only-in-my-mind', 'smooth-operator-(tiktok-remix)', 'cupid', 'from-the-start'],
    'nirvana-mix': ['scentless-apprentice', 'serve-the-slaves', 'i-hate-myself', 'moist-viagra', 'sappy', 'dumb', 'reap-me', 'heart-shaped-box', 'been-a-son'],
    'kurt-cobain-mix': ['poisons_gone', 'and-i-love-her', 'aberdeen', 'you-cant-change-me', 'rehash', 'clean-up-before-she-comes', 'burn-the-rain', 'what-more-can-i-say', 'the-yodel-song', 'do-re-mi-medley'],
    'retro-mix': ['memory-reboot', 'never-gonna-give-you-up', 'kyrie', 'careless-whisper', 'eye-in-the-sky', 'neglect', 'everlasting-love', 'overkill', 'down-under', 'who-can-it-be-now', 'everywhere', 'africa', 'material-girl', 'morning-train', 'smooth-criminal', 'take-on-me', 'dont-stop-believin', 'dont-you-want-me', 'maneater', '踊り子', '初恋'],
    'modern-rock': ['little-dark-age'],
    'hip-hop-mix': ['blueberry-faygo', 'love-you-better', 'back-to-you', 'living-life-in-the-night-slowed', 'mathematical-disrespect', 'sea-of-thieves', 'i-see-london-i-see-france', 'spicy', 'thousand', 'RO7-3ALATOL', 'lemonade', 'buster', 'hollywood-perfect', 'holiday', 'barking', 'outside', 'easier', 'slidin', 'mercedes', 'forever-never'],
  }

  let currentPlaylist = [];
  let queue = [];
  let isLiked = false;

  playlistRows.forEach(row => {
    row.addEventListener('click', () => {
      const playlistName = row.getAttribute('data-playlist');
      currentPlaylist = playlists[playlistName] || [];
      if (currentPlaylist.length > 0) {
        loadSong(0);
        playSong();
      }
    });
  });

  shuffleBtn.addEventListener('click', () => {
    shufflePlaylist();
  });

  let songIndex = 0;

  const playlistIndicator = document.getElementById('playlist-indicator');

  function loadSong(index) {
    let selectedSong;

    if (currentPlaylist.length > 0 && index >= 0 && index < currentPlaylist.length) {
      selectedSong = currentPlaylist[index];
      console.log('Loading song:', selectedSong);

      title.innerText = selectedSong.replace(/-/g, " ");
      audio.src = `music/songs/${selectedSong}.mp3`;
      cover.src = `music/images/${selectedSong}.jpeg`;
      songIndex = index;

      updateQueueList();

      isLiked = playlists['liked-songs'].includes(currentPlaylist[songIndex]);
      updateLikeButton();

      updatePlaylistIndicator();

      console.log('Audio source:', audio.src);

      playSong();
      const songToArtistMap = {

        '怪物': 'yoasobi',
        'ハルジオン': 'yoasobi',
        'ハルカ': 'yoasobi',
        '夜に駆ける': 'yoasobi',
        'あの夢をなぞって': 'yoasobi',
        '三原色': 'yoasobi',
        '祝福': 'yoasobi',
        'セブンティーン': 'yoasobi',
        'もう少しだけ': 'yoasobi',
        'もしも命が描けたら': 'yoasobi',
        'ミスター': 'yoasobi',
        '優しい彗星': 'yoasobi',
        'アドベンチャー': 'yoasobi',
        'ラブレター': 'yoasobi',
        'アンコール': 'yoasobi',
        '勇者': 'yoasobi',
        'romance': 'yoasobi',
        'アイドル': 'yoasobi',
        'たぶん': 'yoasobi',
        '好きだ': 'yoasobi',
        'heart-beat': 'yoasobi',
        'うっせえわ': 'ado',
        '阿修羅ちゃん': 'ado',
        'night-dancer': 'imase',
        'nagisa': 'imase',
        'ヒロイン': 'imase',
        '蕾': 'GReeeen',
        'odoriko': 'vaundy',
        '世界の秘密': 'vaundy',
        '怪獣の花唄': 'vaundy',
        '不可幸力': 'vaundy',
        'napori': 'vaundy',
        'chainsaw-blood': 'vaundy',
        'そんなbitterな話': 'vaundy',
        '花占い': 'vaundy',
        '白日': 'king gnu',
        '一途': 'king gnu',
        'カメレオン': 'king gnu',
        'sleepwalk': 'natori',
        'フライデー・ナイト': 'natori',
        '猿芝居': 'natori',
        'overdose': 'natori',
        'boy': 'king gnu',
        'odoriko-dazbee-cover': 'dazbee, vaundy',
        '最高到達点': 'sekai no owari',
        'habit': 'sekai no owari',
        '打上花火': 'daoko, kenshi yonezu',
        '青のすみか': 'tatsuya kitani',

        'metamorphosis': 'INTERWORLD',
        'rapture': 'INTERWORLD',
        'close-eyes': 'DVRST',
        'close-eyes-sped-up': 'DVRST',
        'lovely-bastards': 'ZWE1HVNDXR, yatashigang',
        'memory-reboot': 'VOJ, narvent',
        'devil-eyes': 'zodvic',
        'rave': 'dxrk',
        'aircraft': 'dxrk',
        'rainstorm': 'dxrk',
        'sahara': 'hensonn',
        'shadow': 'ONIMXRU, SMITHMANE',
        'psycho-cruise': 'ONIMXRU, STRAWANGLE',
        'midnight': 'PLAYAMANE X NATEKI',
        'baixo': 'xxanteria',
        'ghost!': 'phonk.me',
        'classical-phonk': 'BEETHOVEN HIMSELF!!!!!!',
        'eggstreme-duck-phonk': 'sma$her',
        'gigachad-phonk-theme': 'g3ox_em',
        'brazilian-phonk-mano': 'slow-boy',
        'brazilian-danca-phonk': '6YNTHMANE',
        'unholy': 'kordhell, dxrk',
        'murder-in-my-mind': 'kordhell',
        'scopin': 'kordhell',
        'murder-plot': 'kordhell',
        'live-another-day': 'kordhell',
        'a-million-ways-to-murder': 'kordhell',
        'tokyo-drift': 'PRXSXNT FXTURE',
        'hyptonic-data': 'odetari',
        'avoid-me': 'KUTE',
        'neon-blade': 'moondeity',

        'from-the-start': 'laufey',

        'close-eyes-slowed-reverb': 'DVRST',
        'metamorphosis-slowed-reverb': 'INTERWORLD',
        'lovely-bastards-slowed': 'ZWE1HVNDXR, yatashigang',
        'memory-reboot-slowed': 'VOJ, narvent',

        'youre-too-slow': 'odetari',
        'montagem-celestial-de-atena': 'dj orbital',

        'indian-sleigh-ride-remix': 'vindaloo singh',
        'indian-last-christmas-remix': 'vindaloo singh',
        'careless-whisper': 'george michael',
        'shimmy-shimmy-ay': 'shimmy ah',

        'my-ordinary-life': 'the living tombstone',
        'after-dark': 'mr. kitty',
        'chug-jug-with-you': 'leviathanJPTV',
        'kerosene': 'crystal castles',
        'past-lives': 'sapientdream',

        'all-girls-are-the-same': 'juice wrld',
        'what-are-you-so-afraid-of': 'xxxtentacion',
        'frick-love': 'xxxtentacion',
        'got-it-on-me': 'pop smoke',
        'wat-u-want-2': 'yeat',
        'the-box': 'roddy ricch',
        'ballin': 'roddy ricch, mustard',
        'fkumean': 'gunna',
        'no-role-modelz': 'j. cole',
        'wet-dreamz': 'j. cole',
        'chain-gang': 'anti da menace',
        'i-hate-police': 'N.W.A',
        'lovin-on-me': 'jack harlow',
        'sad!': 'xxxtentacion',
        'zeze': 'kodak black',
        'butterfly-effect': 'travis scott',
        'great-gatsby': 'rod wave',
        'space-cadet': 'metro boomin',
        'not-fair': 'the kid laroi',
        'bad': 'xxxtentacion',
        '223s': 'YNW melly',
        'look-back-at-it': 'a boogie wit da hoodie',
        'swervin': 'a boogie wit da hoodie',
        'rockstar': 'da baby',
        'humble': 'kendrick lamar',
        'overtime': 'ken carson',
        'like-this': 'ken carson',

        'paint-the-town-red': '✨💅doja cat!1!💅✨',
        'somebody-that-i-used-to-know': 'gotye (official aussie)',
        'somebodys-watching-me': '👀 rockwell',
        'bad-habit': 'steve lacy',
        'luxury': 'azealia banks',
        'everybody-wants-to-rule-the-world': 'tears for fears',
        'the-perfect-girl': 'mareux',
        'sleepwalker': 'akiaura, LONOWN, STM',

        'mariahcarey': 'all i want for christmas is youuuuu 🎄',
        'snowman': 'sia',
        'last-rizzmas-i-gave-you-my-gyatt': 'every fortnite kid',

        'greedy': 'tate mcrae',
        'it-girl': "aliyah's interlude",
        'ecstasy': 'su1c1de idol',
        'moonlight': 'kali uchis',
        'only-in-my-mind': 'kenya grace',
        'strangers': 'kenya grace',
        'smooth-operator-(tiktok-remix)': 'sade',

        'soviet-anthem': 'soviet union',
        'heil-dir-im-siegerkranz': 'heinrich harrie',
        'horst-wessel-lied': 'horst wessel',
        'deutschlandlied': 'joseph haydn',
        'la-marseillaise': 'claude joseph rouget de lisle',

        'la-campanella': 'rousseau',
        'violin-concerto-in-e-minor': 'felix mendelsshon',
        'adagio-albinoni': 'tomaso albinoni',
        'trio-no-2-in-e-minor': 'franz schubert',
        'moonlight-sonata': 'beethoven',

        'passionfruit': 'drake',
        'teenage-fever': 'drake',
        'idgaf-(frick)': 'drake',

        'reap-me': 'nirvana',
        'heart-shaped-box': 'nirvana',
        'dumb': 'nirvana',
        'sappy': 'nirvana',
        'moist-viagra': 'nirvana',
        'i-hate-myself': 'nirvana',
        'serve-the-slaves': 'GET BACK 2 WORK (nirvana)',
        'scentless-apprentice': 'nirvana',

        'poisons-gone': 'kurt cobain',
        'and-i-love-her': 'kurt cobain',
        'aberdeen': 'kurt cobain',
        'you-cant-change-me': 'kurt cobain',
        'rehash': 'kurt cobain',
        'clean-up-before-she-comes': 'kurt cobain',
        'burn-the-rain': 'kurt cobain',
        'what-more-can-i-say': 'kurt cobain',
        'been-a-son': 'nirvana',
        'the-yodel-song': 'kurt cobain',
        'do-re-mi-medley': 'kurt cobain',

        'never-gonna-give-you-up': 'rick astley',
        '踊り子': 'kozo murashita',
        '初恋': 'kozo murashita',
        'neglect': 'mr. kitty',
        'kyrie': 'mr. mister',
        'eye-in-the-sky': 'the alan parsons project',
        'everlasting-love': 'howard jones',
        'overkill': 'men at work',
        'down-under': 'men at work',
        'who-can-it-be-now': 'men at work',
        'everywhere': 'fleetwood mac',
        'africa': 'toto',
        'material-girl': 'madonna',
        'morning-train': 'sheena easton',
        'smooth-criminal': 'michael jackson',
        'take-on-me': 'a-ha',
        'dont-stop-believin': 'journey',
        'dont-you-want-me': 'the human league',
        'maneater': 'daryl hall and john oates',

        'little-dark-age': 'mgmt',

        'all-my-fellas': 'frizk',

        'blueberry-faygo': 'lil mosey',
        'kamikaze': 'lil mosey',

        'carol-of-the-bells': 'lindsey stirling',
        'christmas-eve-==-sarajevo': 'trans-siberian orchestra'

      };

      function getArtistForSong(songNamee) {
        return songToArtistMap[songNamee] || 'Unknown Artist';
      }

      const currentSongFileName = selectedSong;
      const artist = getArtistForSong(currentSongFileName);

      const artistElement = document.getElementById('artist');
      artistElement.innerText = artist || 'Unknown Artist';

      navigator.mediaSession.metadata = new MediaMetadata({
        title: selectedSong.replace(/-/g, " "),
        artist: artist,
        artwork: [
          {
            src: cover.src,
            sizes: "140x140",
            type: "image/jpeg",
          },
        ],
      });

    } else {
      console.error('Invalid song index or playlist');
    }
  }

  function loadLiked() {
    const liked = localStorage.getItem("liked-songs")
    playlists['liked-songs'].push(liked);

  }

  function loadSongs(playlistId) {
    const playlist = playlists[playlistId];

    if (playlist) {
      const playlistName = playlistId.replace(/-/g, " ");

      const playlistLogo = document.getElementById('playlist-logo');
      playlistLogo.src = `music/images/${playlistId}.jpeg`;

      const playlistNameElement = document.getElementById('playlist-name');
      playlistNameElement.textContent = playlistName;

      const songCountElement = document.getElementById('song-count');
      const songCount = playlist.length;
      songCountElement.textContent = `${songCount} ${songCount === 1 ? 'song' : 'songs'}`;

      const songsContainer = document.querySelector('.songs-container');

      loadLiked();

      songsContainer.innerHTML = '';

      playlist.forEach(songName => {
        const listItem = document.createElement('li');
        const queueSongDesc = document.createElement('div');
        queueSongDesc.classList.add('queue-song-desc');

        const img = document.createElement('img');
        img.src = `music/images/${songName}.jpeg`;
        img.alt = songName;

        const span = document.createElement('span');
        span.textContent = songName.replace(/-/g, " ");

        queueSongDesc.appendChild(img);
        queueSongDesc.appendChild(span);
        listItem.appendChild(queueSongDesc);

        songsContainer.appendChild(listItem);

        const playlistName = playlistId;
        currentPlaylist = playlists[playlistName] || [];
        if (currentPlaylist.length > 0) {
          loadSong(0);
          playSong();
        }
      });
    } else {
      console.error('Playlist not found');
    }
  }

  loadSongs(playlistId);


  function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fa-solid').classList.remove('fa-play');
    playPlaylistBtn.querySelector('i.fa-solid').classList.remove('fa-play');
    playBtn.querySelector('i.fa-solid').classList.add('fa-pause');
    playPlaylistBtn.querySelector('i.fa-solid').classList.add('fa-pause');
    audio.play();
    navigator.mediaSession.playbackState = "playing";
    const currentSong = document.querySelector('.current-song');
    if (currentSong) {
      const visualizer = currentSong.querySelector('.visualizer');
      if (visualizer) {
        visualizer.style.display = 'block'; // Hide the visualizer
      }
    }
  }

  function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fa-solid').classList.add('fa-play');
    playBtn.querySelector('i.fa-solid').classList.remove('fa-pause');
    playPlaylistBtn.querySelector('i.fa-solid').classList.add('fa-play');
    playPlaylistBtn.querySelector('i.fa-solid').classList.remove('fa-pause');
    audio.pause();
    navigator.mediaSession.playbackState = "paused";
    const currentSong = document.querySelector('.current-song');
    if (currentSong) {
      const visualizer = currentSong.querySelector('.visualizer');
      if (visualizer) {
        visualizer.style.display = 'none'; // Hide the visualizer
      }
    }
  }

  playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
    if (isPlaying) {
      pauseSong();
    } else {
      playSong();
    }
  });
  playPlaylistBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
    if (isPlaying) {
      pauseSong();
    } else {
      playSong();

    }
  });

  likeBtn.addEventListener('click', () => {
    isLiked = !isLiked;
    updateLikeButton();
    updateLikedSongs();
  });

  prevBtn.addEventListener('click', () => {
    songIndex = (songIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
    loadSong(songIndex);
    playSong();
    navigator.mediaSession.metadata = new MediaMetadata({
      title: selectedSong.replace(/-/g, " "),
      artist: "smartfoloo-musicplayer",
      artwork: [
        {
          src: cover.src,
          sizes: "300x300",
          type: "image/jpeg",
          src: cover.src,
          sizes: "2000x2000",
          type: "image/jpeg",
        },
      ],
    });
  });

  navigator.mediaSession.setActionHandler("previoustrack", () => {
    songIndex = (songIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
    loadSong(songIndex);
    playSong();
    navigator.mediaSession.metadata = new MediaMetadata({
      title: selectedSong.replace(/-/g, " "),
      artist: "smartfoloo-musicplayer",
      artwork: [
        {
          src: cover.src,
          sizes: "300x300",
          type: "image/jpeg",
          src: cover.src,
          sizes: "2000x2000",
          type: "image/jpeg",
        },
      ],
    });
  });

  nextBtn.addEventListener('click', () => {
    songIndex = (songIndex + 1) % currentPlaylist.length;
    loadSong(songIndex);
    playSong();
    navigator.mediaSession.metadata = new MediaMetadata({
      title: selectedSong.replace(/-/g, " "),
      artist: "smartfoloo-musicplayer",
      artwork: [
        {
          src: cover.src,
          sizes: "300x300",
          type: "image/jpeg",
          src: cover.src,
          sizes: "2000x2000",
          type: "image/jpeg",
        },
      ],
    });
  });

  navigator.mediaSession.setActionHandler("nexttrack", () => {
    songIndex = (songIndex + 1) % currentPlaylist.length;
    loadSong(songIndex);
    playSong();
    navigator.mediaSession.metadata = new MediaMetadata({
      title: selectedSong.replace(/-/g, " "),
      artist: "smartfoloo-musicplayer",
      artwork: [
        {
          src: cover.src,
          sizes: "300x300",
          type: "image/jpeg",
          src: cover.src,
          sizes: "2000x2000",
          type: "image/jpeg",
        },
      ],
    });
  });
  navigator.mediaSession.setActionHandler("play", () => {
    navigator.mediaSession.playbackState = "playing";
    playSong()
  });
  navigator.mediaSession.setActionHandler("pause", () => {
    navigator.mediaSession.playbackState = "paused";
    pauseSong()
  });
  function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
  }

  function setProgress(e) {
    e.stopPropagation(); // Prevents the default behavior (page reload) on progress bar click

    const width = this.clientWidth;
    const clickX = e.type.includes('touch') ? e.touches[0].clientX - this.getBoundingClientRect().left : e.clientX - this.getBoundingClientRect().left;
    const duration = audio.duration;
    const newTime = (clickX / width) * duration;
    audio.currentTime = newTime;

    const isPaused = audio.paused;
    if (!isPaused) {
      audio.play();
    }
  }

  function DurTime(e) {
    const { duration, currentTime } = e.srcElement;
    let sec;
    let sec_d;

    let min = (currentTime == null) ? 0 : Math.floor(currentTime / 60);
    min = min < 10 ? '0' + min : min;

    function get_sec(x) {
      if (Math.floor(x) >= 60) {
        for (let i = 1; i <= 60; i++) {
          if (Math.floor(x) >= (60 * i) && Math.floor(x) < (60 * (i + 1))) {
            sec = Math.floor(x) - (60 * i);
            sec = sec < 10 ? '0' + sec : sec;
          }
        }
      } else {
        sec = Math.floor(x);
        sec = sec < 10 ? '0' + sec : sec;
      }
    }

    get_sec(currentTime, sec);

    let min_d = (isNaN(duration) === true) ? '0' : Math.floor(duration / 60);
    min_d = min_d < 10 ? '0' + min_d : min_d;

    function get_sec_d(x) {
      if (Math.floor(x) >= 60) {
        for (let i = 1; i <= 60; i++) {
          if (Math.floor(x) >= (60 * i) && Math.floor(x) < (60 * (i + 1))) {
            sec_d = Math.floor(x) - (60 * i);
            sec_d = sec_d < 10 ? '0' + sec_d : sec_d;
          }
        }
      } else {
        sec_d = (isNaN(duration) === true) ? '0' : Math.floor(x);
        sec_d = sec_d < 10 ? '0' + sec_d : sec_d;
      }
    }

    get_sec_d(duration);
  }

  function updateQueueList() {
    queueList.innerHTML = '';

    for (let i = 0; i < currentPlaylist.length; i++) {
      if (i >= songIndex) { // Check if the song is yet to be played or currently playing
        const listItem = document.createElement('li');

        const queueSongDesc = document.createElement('div');
        queueSongDesc.classList.add('queue-song-desc');

        const img = document.createElement('img');
        img.src = `music/images/${currentPlaylist[i]}.jpeg`;
        img.alt = currentPlaylist[i];

        queueSongDesc.appendChild(img);

        const titleSpan = document.createElement('span');
        titleSpan.innerText = currentPlaylist[i].replace(/-/g, " ");

        queueSongDesc.appendChild(titleSpan);
        listItem.appendChild(queueSongDesc);

        if (i === songIndex) {
          listItem.classList.add('current-song');

          const visualizerDiv = document.createElement('div');
          visualizerDiv.classList.add('visualizer');
          for (let j = 0; j < 4; j++) {
            const barDiv = document.createElement('div');
            barDiv.classList.add('bar');
            visualizerDiv.appendChild(barDiv);
          }
          listItem.appendChild(visualizerDiv);
        }

        queueList.appendChild(listItem);
      }
    }
  }



  function updateLikeButton() {
    if (isLiked) {
      likeBtn.innerHTML = '<i class="fa-solid fa-heart"></i>';
    } else {
      likeBtn.innerHTML = '<i class="far fa-heart"></i>';
    }
  }

  function updateLikedSongs() {
    if (isLiked) {
      if (!playlists['liked-songs'].includes(currentPlaylist[songIndex])) {
        playlists['liked-songs'].push(currentPlaylist[songIndex]);
        localStorage.setItem("liked-songs", playlists['liked-songs'].toString())

      }
    } else {
      const indexToRemove = playlists['liked-songs'].indexOf(currentPlaylist[songIndex]);
      if (indexToRemove !== -1) {
        playlists['liked-songs'].splice(indexToRemove, 1);
        localStorage.setItem("liked-songs", playlists['liked-songs'].toString())
      }
    }
  }

  function updatePlaylistIndicator() {
    const playlistName = getPlaylistNameBySong(currentPlaylist[songIndex]);
    playlistIndicator.innerText = `Playing from: ${playlistName.replace(/-/g, " ")}`;
  }

  function getPlaylistNameBySong(song) {
    for (const [playlistName, songs] of Object.entries(playlists)) {
      if (songs.includes(song)) {
        return playlistName;
      }
    }
    return 'Unknown Playlist';
  }

  function shufflePlaylist() {
    for (let i = currentPlaylist.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [currentPlaylist[i], currentPlaylist[j]] = [currentPlaylist[j], currentPlaylist[i]];
    }
    loadSong(0);
    playSong();
  }

  audio.addEventListener('timeupdate', updateProgress);
  progressContainer.addEventListener('click', setProgress);

  audio.addEventListener('ended', () => {
    songIndex = (songIndex + 1) % currentPlaylist.length;
    loadSong(songIndex);
    playSong();
  });

  audio.addEventListener('timeupdate', DurTime);

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      if (musicContainer.classList.contains('play')) {
        playSong();
      }
    }
  });

  queueButton.addEventListener('click', () => {
    if (queueContainer.style.display === 'block') {
      queueContainer.style.display = 'none';
      mainContent.forEach(content => {
        content.style.width = '85%';
      });
    } else {
      queueContainer.style.display = 'block';
      mainContent.forEach(content => {
        content.style.width = '60%';
      });
    }
  });

});

var tab = localStorage.getItem("tab");

if (tab) {
  try {
    var tabData = JSON.parse(tab);
  } catch {
    var tabData = {};
  }
} else {
  var tabData = {};
}

if (tabData.title) {
  document.getElementById("title").value = tabData.title;
}
if (tabData.icon) {
  document.getElementById("icon").value = tabData.icon;
}

var settingsDefaultTab = {
  title: "skark",
  icon: "/favicon.png",
};

function setTitle(title = "") {
  if (title) {
    document.title = title;
  } else {
    document.title = settingsDefaultTab.title;
  }

  var tab = localStorage.getItem("tab");

  if (tab) {
    try {
      var tabData = JSON.parse(tab);
    } catch {
      var tabData = {};
    }
  } else {
    var tabData = {};
  }

  if (title) {
    tabData.title = title;
  } else {
    delete tabData.title;
  }

  localStorage.setItem("tab", JSON.stringify(tabData));
}

function setFavicon(icon) {
  if (icon) {
    document.querySelector("link[rel='icon']").href = icon;
  } else {
    document.querySelector("link[rel='icon']").href = settingsDefaultTab.icon;
  }

  var tab = localStorage.getItem("tab");

  if (tab) {
    try {
      var tabData = JSON.parse(tab);
    } catch {
      var tabData = {};
    }
  } else {
    var tabData = {};
  }

  if (icon) {
    tabData.icon = icon;
  } else {
    delete tabData.icon;
  }

  localStorage.setItem("tab", JSON.stringify(tabData));
}

var tab = localStorage.getItem('tab');
if (tab) {
  try {
    var tabData = JSON.parse(tab);
  } catch {
    var tabData = {};
  }
} else {
  var tabData = {};
}

if (tabData.title) {
  document.title = tabData.title;
}

if (tabData.icon) {
  document.querySelector('link[rel="icon"]').href = tabData.icon;
}