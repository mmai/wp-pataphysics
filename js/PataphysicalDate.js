/*
 *  PataphysicalDate.js  -- A javascript library which convert Gregorian dates to the Pataphysical Calendar
 *  Author:     Henri Bourcereau (henri AT bourcereau fr) 
 *  URL:         https://github.com/mmai/pataphysical-date
 */

(function(exports){

        PataphysicalDate = function(date){
            if (typeof(date) === 'undefined'){
                date = new Date();
            } else if (typeof(date) === 'string'){
                date = new Date(date);
            }

            if (!(date instanceof Date) || date.toString() === 'Invalid Date'){
                throw new Error('Invalid input date');
            }

            this.gregorian = date;
            var pDate = calculateDate(this.gregorian);

            this.year = pDate.year;
            this.month = pDate.month - 1;
            this.day = pDate.day;
        };  

        PataphysicalDate.prototype = {
            toString: function(){
                var day = this.day;
                if (this.day === 1) {
                    day = "1er";
                }
                return [this.getDayName(), day, this.getMonthName(), this.year].join(' ');
            },
            getFullYear: function(){
                return this.year;
            },
            getMonth: function(){
                return this.month;
            },
            getDay: function(){
                return this.day;
            },
            getDayName: function(){
                var days = ["Samedi", "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

                var name = days[this.day % 7];
                if (this.day === 29) {
                    name = "Hunyadi";
                }

                return name;
            },
            getDayImportance: function(){
                var importances = [
                  "fête suprême première première",
                  "fête suprême quarte",
                  "fête suprême tierce",
                  "vacuation",
                  "fête suprême seconde",
                  "fête suprême première seconde"
                ];
                var pmonth = pcalendar[this.month];
                return importances[pmonth.days[this.day - 1].i];
            },
            getMonthName: function(){
                var pmonth = pcalendar[this.month];
                return pmonth.month;
            }, 
            getSaintOfDay: function(){
                var pmonth = pcalendar[this.month];
                return pmonth.days[this.day - 1].st;
            }
        };

        var calculateDate = function(date){
            var pDay, pMonth, pYear, pWeekDay;

            var gDay = date.getDate();
            var gMonth = date.getMonth()+1;
            var gYear = date.getFullYear();
            
            var ref;
            if ((gMonth > 9) || (gMonth==9 && gDay > 7)) {
                pYear = gYear - 1872;
                ref = new Date(gYear, 8, 8);
            } else {
                pYear = gYear - 1873;
                ref = new Date(gYear-1, 8, 8);
            }

            var days = dateDiff(date, ref); 

            var leapYear = isLeapYear(gYear);
            var leapDay = leapYear ? -1 : 0;

            if (leapYear && gMonth == 2 && gDay == 23) {
                pDay = 29;
                pMonth = Math.floor(days / 28);
            } else if ((gMonth == 2 && gDay > 23) || (gMonth > 2 && gMonth <7) || (gMonth == 7 && gDay < 13)) {
                pDay = (days + leapDay) % 28 + 1;
                pMonth = Math.floor((days + leapDay) / 28) + 1;
            } else if (gMonth == 7 && gDay == 13) {
                pDay = 29;
                pMonth = Math.floor(days / 28);
            } else if ((gMonth == 7 && gDay > 13) || (gMonth > 7 && gMonth < 9) || (gMonth == 9 && gDay < 8)) {
                pDay = (days + leapDay - 1) % 28 + 1;
                pMonth = Math.floor((days + leapDay - 1) / 28) + 1;
            } else {
                pDay = days % 28 + 1;
                pMonth = Math.floor(days / 28) + 1;
            }

            return {
                day: pDay,
                month: pMonth,
                year: pYear
            }

        };

        var isLeapYear = function (year){
            return dateDiff( new Date(year+"-12-31"), new Date(year+"-01-01")) == 365;
        }

        var dateDiff = function (date1, date2){
            date1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
            date2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
            var ms = Math.abs(date1-date2);
            return ms/1000/60/60/24;
        }

        var pcalendar = [
           { month:"Absolu",
               days:[
                   {i:0, st:"NATIVITÉ d'ALFRED JARRY"},
                   {i:1, st:"St Ptyx, silentiaire (Abolition de)"},
                   {i:1, st:"St Phénix, solipsiste et St Hyx, factotum"},
                   {i:1, st:"St Lucien de Samosate, voyageur"},
                   {i:1, st:"St Bardamu, voyageur"},
                   {i:1, st:"Ste Vérola, assistante sociale"},
                   {i:1, st:"St Alambic, abstracteur"},
                   {i:2, st:"ABSINTHE, ci-devant *St Alfred"},
                   {i:1, st:"Descente du St Esprit (de Vin)"},
                   {i:3, st:"Dilution"},
                   {i:1, st:"Ste Purée, sportswoman"},
                   {i:3, st:"Vide"},
                   {i:1, st:"St Canterel, l'illuminateur"},
                   {i:1, st:"St Sophrotatos l'Arménien, pataphysicien"},
                   {i:2, st:"ÉTHERNITÉ"},
                   {i:1, st:"St Ibicrate le Géomètre, pataphysicien"},
                   {i:3, st:"Céphalorgie"},
                   {i:3, st:"Flûtes de Pan"},
                   {i:1, st:"Stes Grues, ophiophiles"},
                   {i:1, st:"Ste Mélusine, souillarde de cuisine"},
                   {i:1, st:"*St Venceslas, duc"},
                   {i:4, st:"EMMANUEL DIEU"},
                   {i:1, st:"Ste Varia-Miriam, amphibie"},
                   {i:1, st:"Sts Rakirs et Rastrons, porte-côtelettes"},
                   {i:1, st:"Nativité de Sa Magnificence Opach"},
                   {i:1, st:"St Joseb, notaire à la mode de Bretagne"},
                   {i:1, st:"Stes Gigolette et Gaufrette, dogaresses"},
                   {i:3, st:"Xylostomie"},
                   {i:3, st:"Le Jet Musical"}
               ]
           },
           { month:"Haha",
             days:[
                   {i:4, st:"L'ÂGE DU Dr FAUSTROLL"},
                   {i:1, st:"Dissolution d'E. Poe, dinomythurge"},
                   {i:1, st:"St Gibus, franc-maçon"},
                   {i:1, st:"Ste Berthe de Courrière, égérie"},
                   {i:1, st:"Ste Belgique, nourrice"},
                   {i:1, st:"Ste Tourte, lyrique et Ste Bévue, sociologue"},
                   {i:1, st:"St Prout, abbé"},
                   {i:4, st:"FÊTE DU HAHA"},
                   {i:3, st:"Tautologie"},
                   {i:1, st:"St Panmuphle, huissier"},
                   {i:1, st:"Sortie de St L. Cranach, apocalypticien"},
                   {i:1, st:"St Cosinus, savant"},
                   {i:1, st:"Bse Fenouillard, sainte famille"},
                   {i:1, st:"Exhibition de la Daromphe"},
                   {i:2, st:"NATIVITÉ DE L'OESTRE, artificier"},
                   {i:1, st:"Ste Vadrouille, emblème"},
                   {i:1, st:"St Homais d'Aquin, prudhomme"},
                   {i:1, st:"Nativité de Sa Magnificence le baron Mollet (*St Pipe)"},
                   {i:1, st:"*St Raphaël, apéritif et philistin"},
                   {i:2, st:"STRANGULATION DE BOSSE-DE-NAGE"},
                   {i:2, st:"ZIMZOUM DE BOSSE-DE-NAGE"},
                   {i:4, st:"RÉSURRECTION DE BOSSE-DE-NAGE"},
                   {i:2, st:"CHAPEAU DE BOSSE-DE-NAGE"},
                   {i:1, st:"St Cl. Terrasse, musicien des Phynances"},
                   {i:1, st:"St J.-P. Brisset, philologue, prince des penseurs"},
                   {i:1, st:"Commémoration du Cure-dent"},
                   {i:5, st:"OCCULTATION D'ALFRED JARRY"},
                   {i:1, st:"Fuite d'Ablou"},
                   {i:3, st:"Marée Terrestre"}
               ]
           },
           { month:"As",
               days:[
                   {i:2, st:"NATIVITÉ DE PANTAGRUEL"},
                   {i:1, st:"Ste Rrose Sélavy, héroïne"},
                   {i:1, st:"Couronnement de Lord Patchogue, miroitier"},
                   {i:1, st:"St Cravan, boxeur"},
                   {i:1, st:"St Van Meegeren, faussaire"},
                   {i:1, st:"St Omnibus, satyre"},
                   {i:1, st:"St Cyrano de Bergerac, explorateur"},
                   {i:2, st:"St RIMBE, OISIF"},
                   {i:3, st:"Équarrissage pour tous"},
                   {i:1, st:"St Abstrait, bourreau"},
                   {i:1, st:"St Ossian, barde postiche"},
                   {i:2, st:"DISPUTE DU SIGNE + ET DU SIGNE -"},
                   {i:2, st:"MOUSTACHES DU Dr FAUSTROLL"},
                   {i:1, st:"St P. Bonnard, peintre des Phynances"},
                   {i:5, st:"NAVIGATION DU Dr FAUSTROLL"},
                   {i:1, st:"St Cap, captain"},
                   {i:1, st:"St Pangloss, humoriste passif"},
                   {i:1, st:"St Chambernac, pauvriseur"},
                   {i:1, st:"St Courtial des Péreires, aérostier et inventeur"},
                   {i:1, st:"St Olibrius, augure"},
                   {i:1, st:"St Possible, schizophrène"},
                   {i:4, st:"St LAUTRÉAMONT"},
                   {i:1, st:"St Quincey, critique d'art"},
                   {i:1, st:"St Berbiguier, martyr"},
                   {i:1, st:"St Lewis Carroll, professeur"},
                   {i:1, st:"St Mensonger, évêque"},
                   {i:1, st:"Ste Visité, fille du précédent"},
                   {i:1, st:"Nativité de St Swift, chanoine"},
                   {i:3, st:"Traversée du Miroir"}
               ]
           },
           { month:"Sable",
            days:[
                   {i:2, st:"NOCES DE BALKIS ET DE SALOMON"},
                   {i:1, st:"St Doublemain, idéologue"},
                   {i:1, st:"St Phlegmon, doctrinaire"},
                   {i:1, st:"*Ste Barbe (femme à), femme-canon"},
                   {i:1, st:"Ste Savate, avocate"},
                   {i:1, st:"St Navet et Ste Perruque, humanistes"},
                   {i:1, st:"St Birbe, juge"},
                   {i:4, st:"CONCEPTION DU P. UBU (A. J.)"},
                   {i:1, st:"St Sagouin, homme d'État"},
                   {i:5, st:"EXALTATION D'UBU ROI (Ubu d'hiver)"},
                   {i:1, st:"Nativité de St Grabbe, scherziste"},
                   {i:1, st:"Ste Choupe, mère de famille"},
                   {i:1, st:"*St Flaive, concierge"},
                   {i:1, st:"Don Quichotte, champion du monde"},
                   {i:4, st:"KHURMOOKUM DU Dr FAUSTROLL"},
                   {i:1, st:"St Nul, exempt"},
                   {i:1, st:"St Moyen, français"},
                   {i:1, st:"Ste Lurette, joconde"},
                   {i:2, st:"GRAVIDITÉ DE MÈRE UBU"},
                   {i:1, st:"St Sabre, allopathe"},
                   {i:1, st:"Ste Tape, pompette"},
                   {i:5, st:"CÉSAR - ANTECHRIST"},
                   {i:1, st:"*Ste Viole, vierge et martyre"},
                   {i:1, st:"Ste Pochetée, gouvernante"},
                   {i:2, st:"NATIVITÉ DE L'ARCHÉOPTÉRYX"},
                   {i:1, st:"Monsieur Sisyphe"},
                   {i:1, st:"St Tic, conjoint"},
                   {i:1, st:"St Cervelas, penseur"},
                   {i:3, st:"Aleph"}
               ]                   
           },
           {
               month:"Décervelage",
            days:[
                   {i:2, st:"St ALAODINE, virtuose"},
                   {i:1, st:"Sts Hassassins, praticiens"},
                   {i:3, st:"Astu"},
                   {i:5, st:"DÉCERVELAGE"},
                   {i:1, st:"Sts Giron, Pile et Cotice, palotins"},
                   {i:1, st:"Sts Polonais, prolétaires"},
                   {i:1, st:"Sts Forçats, poliorcètes"},
                   {i:2, st:"St BORDURE, CAPITAINE"},
                   {i:1, st:"Dormition de Jacques Vaché, interprète"},
                   {i:3, st:"Drapaud (érection du)"},
                   {i:1, st:"*St Eustache, libérateur"},
                   {i:1, st:"St Landru, gynécologue"},
                   {i:1, st:"St Guillotin, médecin"},
                   {i:1, st:"Sts 4 Sans-Cou, enchanteurs"},
                   {i:2, st:"CONSCIENCE D'UBU"},
                   {i:1, st:"St Mauvais, sujet"},
                   {i:1, st:"St Mandrin, poète et philosophe"},
                   {i:1, st:"Sts Pirates et Flibustiers, thaumaturges"},
                   {i:1, st:"St et Ste Cartouche, vétérinaires"},
                   {i:1, st:"St Outlaw, aristocrate"},
                   {i:5, st:"CHAIRE DU Dr FAUSTROLL"},
                   {i:4, st:"OSTENTION DU BÂTON À PHYSIQUE"},
                   {i:1, st:"St Tank, animal"},
                   {i:1, st:"St Weidman, patriarche"},
                   {i:1, st:"St Petiot, expert"},
                   {i:3, st:"Escrime"},
                   {i:1, st:"Sts Chemins de fer, assassins"},
                   {i:3, st:"Repopulation"},
                   {i:3, st:"Lit de Procruste"}
               ]                   
           },
           {
               month:"Gueules",
            days:[
                   {i:2, st:"DÉPUCELAGE DE MÈRE UBU"},
                   {i:1, st:"St Sigisbée, eunuque"},
                   {i:1, st:"St Anthropoïde, policier"},
                   {i:1, st:"*Ste Goule ou Gudule, institutrice"},
                   {i:1, st:"Ste Gale, abbesse"},
                   {i:1, st:"Ste Touche, postulante"},
                   {i:1, st:"St Gueule, abbé"},
                   {i:2, st:"FÊTE DE LA CHANDELLE VERTE"},
                   {i:1, st:"Ste Crêpe, laïque"},
                   {i:1, st:"St Préservatif, bedeau"},
                   {i:1, st:"St Baobab, célibataire"},
                   {i:1, st:"St Membre, compilateur"},
                   {i:3, st:"Copulation"},
                   {i:1, st:"Nativité de St J. Verne, globe-trotter en chambre"},
                   {i:2, st:"ALICE AU PAYS DES MERVEILLES"},
                   {i:1, st:"St Münchhausen, baron"},
                   {i:1, st:"Le Bétrou, théurge"},
                   {i:1, st:"Nativité de St Deibler, prestidigitateur"},
                   {i:1, st:"St Sade ès liens"},
                   {i:1, st:"St Lafleur, valet"},
                   {i:3, st:"Lavement"},
                   {i:5, st:"St SEXE, STYLITE"},
                   {i:1, st:"Occultation de St J. Torma, euphoriste"},
                   {i:1, st:"Conversion de St Matorel, bateleur"},
                   {i:1, st:"Ste Marmelade, inspirée"},
                   {i:2, st:"L'AMOUR ABSOLU, deliquium"},
                   {i:1, st:"Ste Tabagie, cosmogène"},
                   {i:1, st:"Sts Hylactor et Pamphagus"},
                   {i:3, st:"Mouvement Perpétuel"}
               ]                   
           },
           {
               month:"Pédale",
               days:[
                   {i:2, st:"DU SURMÂLE"},
                   {i:1, st:"St André Marcueil, ascète cycliste"},
                   {i:1, st:"St Ellen, hile"},
                   {i:1, st:"St Michet, idéaliste"},
                   {i:1, st:"St Ouducul, trouvère"},
                   {i:1, st:"Vers Belges"},
                   {i:1, st:"St Gavroche, forain"},
                   {i:2, st:"LA MACHINE À INSPIRER L'AMOUR"},
                   {i:1, st:"*St Remezy, évêque in partibus"},
                   {i:1, st:"Nativité de St Tancrède, jeune homme"},
                   {i:1, st:"Testament de P. Uccello, le mal illuminé"},
                   {i:1, st:"St Hari Seldon, psychohistorien galactique"},
                   {i:1, st:"*Ste Valburge, succube"},
                   {i:3, st:"Sabbat"},
                   {i:2, st:"Sts ADELPHES, ÉSOTÉRISTES"},
                   {i:1, st:"Sts Templiers, adeptes"},
                   {i:1, st:"St Dricarpe, prosélyte"},
                   {i:1, st:"St Nosocome, carabin"},
                   {i:1, st:"Ste Goutte, fête militaire"},
                   {i:1, st:"Ste Cuisse, dame patronnesse"},
                   {i:1, st:"St Inscrit, Converti"},
                   {i:4, st:"St SENGLE, DÉSERTEUR"},
                   {i:1, st:"St Masquarade, uniforme"},
                   {i:1, st:"Nativité de St Stéphane, faune"},
                   {i:1, st:"St Poligraf Poligrafovitch, chien"},
                   {i:1, st:"St Pâle, mineur"},
                   {i:2, st:"St VALENS, FRÈRE ONIRIQUE"},
                   {i:3, st:"Dédicace du Tripode"},
                   {i:1, st:"Bse Escampette, dynamiteuse"}
               ]
           },
           {
               month:"Clinamen",
            days:[
                   {i:2, st:"St ABLOU, PAGE et St HALDERN, DUC"},
                   {i:1, st:"Sts Hiboux, maîtres-chanteurs"},
                   {i:1, st:"La Mandragore, solanée androïde"},
                   {i:1, st:"St Pagne, confident"},
                   {i:1, st:"Sts Aster et Vulpian, violateurs du Néant"},
                   {i:1, st:"St Ganymède, professionnel"},
                   {i:3, st:"La Main de Gloire"},
                   {i:4, st:"LA MACHINE À PEINDRE"},
                   {i:1, st:"Ste Trique, lunatique"},
                   {i:1, st:"Rémission des Poissons"},
                   {i:1, st:"St Maquereau, intercesseur"},
                   {i:1, st:"St Georges Dazet, poulpe au regard de soie"},
                   {i:1, st:"Nativité de Maldoror, corsaire aux cheveux d'or"},
                   {i:1, st:"Sortie d'A. Dürer, hermétiste"},
                   {i:0, st:"INVENTION de la 'PATAPHYSIQUE"},
                   {i:1, st:"Exit St Domenico Theotocopouli, el Greco"},
                   {i:1, st:"St Hiéronymus Bosch, démonarque"},
                   {i:3, st:"Les 27 Êtres Issus des Livres Pairs"},
                   {i:1, st:"St Barbeau, procureur et Ste Morue, juste"},
                   {i:3, st:"Capture du Fourneau"},
                   {i:1, st:"St Docteur Moreau, insulaire"},
                   {i:4, st:"FÊTE DES POLYÈDRES"},
                   {i:3, st:"Locus Solus"},
                   {i:1, st:"*St Tupetu de Tupetu, organisateur de loteries"},
                   {i:1, st:"Exit St Goya, alchimiste"},
                   {i:1, st:"St Escargot, sybarite"},
                   {i:1, st:"Ste Hure de Chasteté, pénitente"},
                   {i:1, st:"St Turgescent, iconoclaste"},
                   {i:3, st:"Cymbalum Mundi"}
               ]                   
           },
           {
               month:"Palotin",
               days:[
                   {i:2, st:"Sts CROCODILES, CROCODILES"},
                   {i:1, st:"Fête des Écluses"},
                   {i:1, st:"Sts Trolls, pantins"},
                   {i:1, st:"Ste Susan Calvin, docteur"},
                   {i:1, st:"Ste Poignée, veuve et Ste Jutte, recluse"},
                   {i:1, st:"Ste Oneille, gourgandine"},
                   {i:1, st:"St Fénéon ès Liens"},
                   {i:2, st:"St BOUGRELAS, PRINCE"},
                   {i:1, st:"Sts Boleslas et Ladislas, polonais"},
                   {i:1, st:"St Forficule, Barnabite"},
                   {i:3, st:"Explosion du Palotin"},
                   {i:3, st:"Réprobation du Travail"},
                   {i:1, st:"Esquive de St Léonard (de Vinci), illusionniste"},
                   {i:1, st:"St Équivoque, sans-culotte"},
                   {i:2, st:"ADORATION DU PAL"},
                   {i:1, st:"Déploration de St Achras, éleveur de Polyèdres"},
                   {i:1, st:"St Macrotatoure, caudataire"},
                   {i:3, st:"Canotage"},
                   {i:1, st:"Occultation de St Gauguin, océanide"},
                   {i:1, st:"St Ti Belot, séide"},
                   {i:1, st:"Occultation de Sa Magnificence le Dr Sandomir"},
                   {i:4, st:"Sts PALOTINS des PHYNANCES"},
                   {i:1, st:"Sts Quatrezoneilles, Herdanpo, Mousched-Gogh, palotins"},
                   {i:1, st:"Ste Lumelle, écuyère"},
                   {i:1, st:"Sts Potassons, acolythes"},
                   {i:1, st:"Ste Prétentaine, rosière"},
                   {i:1, st:"St Foin, coryphée"},
                   {i:1, st:"Nativité de St Satie, Grand Parcier de l'Église d'Art"},
                   {i:3, st:"Erratum"}
               ]
           },
           {
               month:"Merdre",
            days:[
                   {i:2, st:"ACCOUCHEMENT DE Ste JEANNE, PAPESSE"},
                   {i:3, st:"Le Moutardier du Pape"},
                   {i:1, st:"St Siège, sous-pape"},
                   {i:1, st:"Nativité de St H. Rousseau, douanier"},
                   {i:1, st:"St Crouducul, troupier"},
                   {i:1, st:"*St Cucufat, mécène"},
                   {i:1, st:"Nativité de M. Plume, propriétaire"},
                   {i:4, st:"COCUAGE DE M. LE P. UBU"},
                   {i:3, st:"Vidange"},
                   {i:1, st:"St Barbapoux, amant"},
                   {i:1, st:"St Memnon, vidangeur"},
                   {i:1, st:"Stes Miches, catéchumènes"},
                   {i:1, st:"Ste Lunette, solitaire"},
                   {i:1, st:"St Sphincter, profès"},
                   {i:2, st:"Sts SERPENTS D'AIRAIN"},
                   {i:1, st:"Nativité de *St Donatien A. François"},
                   {i:1, st:"St Woland, professeur"},
                   {i:1, st:"St Anal, cordelier et Ste Foire, anagogue"},
                   {i:1, st:"Ste Fétatoire, super"},
                   {i:1, st:"Ste Colombine, expurgée"},
                   {i:1, st:"Ste Pyrotechnie, illuminée"},
                   {i:0, st:"ONTOGÉNIE PATAPHYSIQUE"},
                   {i:2, st:"INTERPRÉTATION DE L'UMOUR"},
                   {i:1, st:"Ste Purge, sage-femme"},
                   {i:4, st:"APPARITION D'UBU ROI"},
                   {i:1, st:"Ste Barbaque, naïade"},
                   {i:1, st:"Sts Courts et Longs, gendarmes"},
                   {i:1, st:"St Raca, cagot"},
                   {i:3, st:"Défaite du Mufle"}
               ]                   
           },
           {
               month:"Gidouille",
               days:[
                   {i:2, st:"Ste BOUZINE, ESPRIT"},
                   {i:1, st:"St Lucullus, amateur (Bloomsday)"},
                   {i:1, st:"Ste Dondon, amazone"},
                   {i:1, st:"Ste Tripe, républicaine"},
                   {i:1, st:"St Ugolin, mansuet"},
                   {i:1, st:"St Dieu, retraité"},
                   {i:1, st:"St Bébé Toutout, évangéliste"},
                   {i:2, st:"Ste BOUDOUILLE, BAYADÈRE"},
                   {i:1, st:"Ste Outre, psychiatre"},
                   {i:1, st:"St Boudin, recteur"},
                   {i:1, st:"Sacre de Talou VII, empereur du Ponukélé"},
                   {i:1, st:"Ste Confiture, dévote et Ste Cliche, donatrice"},
                   {i:1, st:"Sts Instintestins, conseillers intimes"},
                   {i:1, st:"St Colon, artilleur"},
                   {i:2, st:"Ste GIBORGNE, VÉNÉRABLE"},
                   {i:1, st:"St Inventaire, poète"},
                   {i:1, st:"Ste Femelle, technicienne"},
                   {i:4, st:"VISITATION DE MÈRE UBU"},
                   {i:1, st:"St Sein, tautologue"},
                   {i:1, st:"St Périnée, zélateur"},
                   {i:1, st:"St Spéculum, confesseur"},
                   {i:4, st:"FÊTE DE GIDOUILLE"},
                   {i:1, st:"St Ombilic, gymnosophiste"},
                   {i:1, st:"St Gris-gris, ventre"},
                   {i:1, st:"St Bouffre, pontife"},
                   {i:1, st:"Ste Goulache, odalisque"},
                   {i:1, st:"Ste Gandouse, hygiéniste"},
                   {i:3, st:"Poche du Père Ubu"},
                   {i:4, st:"NOM D'UBU"}
               ]
           },
           {
               month:"Tatane",
            days:[
                   {i:5, st:"FÊTE DU P. UBU (Ubu d'été)"},
                   {i:1, st:"Commémoration du P. Ébé"},
                   {i:1, st:"Ste Crapule, puriste et St Fantomas, archange"},
                   {i:1, st:"Ascension du Mouchard, statisticien, psychiatre et policier"},
                   {i:1, st:"St Arsouille, patricien"},
                   {i:1, st:"Sts Robot et Cornard, citoyens"},
                   {i:1, st:"St Biribi, taulier"},
                   {i:4, st:"SUSCEPTION DU CROC À MERDRE"},
                   {i:1, st:"Sts Écrase-Merdre, sectateurs"},
                   {i:1, st:"Sts Pieds Nickelés, trinité"},
                   {i:1, st:"Stes Canicule et Canule, jouvencelles"},
                   {i:1, st:"Sts Cannibales, philanthropes"},
                   {i:1, st:"St Dada, prophète"},
                   {i:1, st:"Ste Anne, pèlerine, énergumène"},
                   {i:4, st:"PROCESSION AUX PHYNANCES"},
                   {i:1, st:"Transfiguration de St V. van Gogh, transmutateur"},
                   {i:1, st:"Ste Flamberge, voyante"},
                   {i:1, st:"St Trou, chauffeur"},
                   {i:1, st:"Ste Taloche, matrone"},
                   {i:1, st:"St Tiberge, frère quêteur"},
                   {i:1, st:"Sts Catoblepas, lord et Anoblepas, amiral"},
                   {i:4, st:"UBU ÈS LIENS"},
                   {i:1, st:"St Pissembock, oncle"},
                   {i:1, st:"St Pissedoux, caporal des hommes libres"},
                   {i:1, st:"St Panurge, moraliste"},
                   {i:1, st:"St Glé, neurologue-aliéniste"},
                   {i:1, st:"St Pistolet à Merdre, jubilaire"},
                   {i:1, st:"Nativité de St Bruggle"},
                   {i:3, st:"Le soleil solide froid"}
               ]                   
           },
           {
               month:"Phalle",
               days:[
                   {i:2, st:"St CHIBRE, PLANTON"},
                   {i:1, st:"*Ste Ruth, zélatrice"},
                   {i:1, st:"St Zebb, passe-partout"},
                   {i:1, st:"St Mnester, confesseur"},
                   {i:4, st:"ASSOMPTION DE Ste MESSALINE"},
                   {i:3, st:"Penis Angelicus"},
                   {i:1, st:"*St Patrobas, pompier"},
                   {i:2, st:"Ste LÉDA, AJUSTEUSE"},
                   {i:1, st:"St Godemiché, économe"},
                   {i:1, st:"Ste Nitouche, orante"},
                   {i:1, st:"Ste Lèchefrite, botteuse"},
                   {i:1, st:"Ste Andouille, amphibologue"},
                   {i:1, st:"Ste Bitre, ouvreuse et St Étalon, couvreur"},
                   {i:2, st:"BATAILLE DE MORSANG"},
                   {i:2, st:"MORT DE DIONYSOS, SURHOMME"},
                   {i:1, st:"Nativité de St Vibescu, pohète et Commémoration de Ste Cuculine d'Ancône"},
                   {i:1, st:"Ste Gallinacée, cocotte"},
                   {i:1, st:"St Lingam, bouche-trou"},
                   {i:1, st:"St Prélote, capucin"},
                   {i:1, st:"*St Pie VIII, navigant"},
                   {i:2, st:"St ERBRAND, POLYTECHNICIEN"},
                   {i:4, st:"Ste DRAGONNE, PYROPHAGE"},
                   {i:1, st:"*St Lazare, gare"},
                   {i:1, st:"Ste Orchidée, aumonière"},
                   {i:1, st:"Nativité apparente d'Artaud le Momo"},
                   {i:1, st:"Disparition de l'Ancien Breughel, incendiaire"},
                   {i:1, st:"*St Priape, franc-tireur"},
                   {i:2, st:"TRANSFIXION DE Ste MESSALINE"},
                   {i:3, st:"Le Termès"}
               ]
           }
       ];

       exports = PataphysicalDate;

   })(typeof exports === 'undefined'? {}: exports);
