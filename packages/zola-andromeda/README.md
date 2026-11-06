# Andromeda for Firekylin

Port of Parker Lamb/Pixadus’s Andromeda photojournal for Zola, pinned revision in NOTICE.md. Retains original MIT notice, original Sass, separately licensed Rainbow Galaxy script and four local OFL font families. Font binary revisions differ from upstream; hashes and licenses included. No demo photos copied.

Preserves dark animated star header,Orbitron masthead,square photograph cards with bottom title/description/date,100vharticlephotohero,Montserrat headings,PTSerif body and Handlee cardmetadata. NativefeaturedImage supplies card/hero covers with safe http(s)/root-relative URL validation; missing or rejected covers use a neutral dark surface. Article text occupies60%desktop/80%mobile width while embedded images can use full width. Menus wrap without JS. Reduced motion disables the canvas; hidden tabs stop animation until reload.

Supports native posts/pages,attachments,archives,taxonomy,search,pagination,protected content and comments. Escaped footer text/author configurable. Native excerpt replaces Zola description; pagination extends the original all-posts feed. Nanogallery2 full-screen gallery/Flickr integration,lozad,jQuery,custom social/favicon and Zola shortcodes are not ported. Use Firekylin’s normal inserted images/attachments; upstream data-ngthumb gallery markup is unsupported. Remote comment login/submission untested.

Actual ZIP validation uses pinned Firekylin2.17.1 SQLite,18desktop/mobile routes,private/draft exclusion,comments,wide media/attachments and no-JS navigation/search. Extra checks verifycardimages/missing+hostilecovers,responsivecardlayout,viewporthero,readingwidths,localfonts,canvas and reducedmotion. Screenshots compared with pinned source templates/CSS,not live demo pixels.
