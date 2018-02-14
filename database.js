const mockPosts = {
    1: {
        title: 'Post 1',
        body: [
            'Souwesera doral fontainebleau leah arts district, gramps flaca dolphin mall tiki tiki music. Literally arroz con mango bird road the fair 305 till I die 836. Super flagler completo, 836 pops porter north beach telly Haslem. Design district promoter friend arroz con mango FIU dolphin mall hialeah little havana.',
            'Edgewater irregardless basel que fancy. UM dassitttt pops porter que pena, vizcaya caja china venetian causeway. Mission bro critical mass omni, papo Pepe Billete sweetwater literally fontainebleau leah arts district.Booty bass la 20 y 20 botanica Dolphins park west.Deco Drive PLP de pinga, bulykkk promoter friend supposably MiMo fire edgewater FIU ricer dassitttt.'
        ],
        commentIds: [1, 2]
    },
    2: {
        title: 'Post 2',
        body: [
            'Downtown fontainebleau dassitttt cafe con leche oye morena papo valsan MDC. Miami time power love hour getty bottles, miami springs pastelitos flagler oye morena kendall croquetica north beach jackson memorial south beach dolphin mall.UM que pena collins ave chonga mission bro.Dassitttt botanica power love hour midtown gorda art basel little haiti flagler. Literally de pinga tiki tiki music ricer guateber Panthers cafe con leche.',
            'Little havana flagler west flagler buena vista la 20 y 20 no yeah, yeah no completo. Mission bro LIV hialeah botanica metrorail downtown pastelitos Panthers, pops porter gramps westchester buena vista.'
        ],
        commentIds: [4]
    }
}

const mockComments = {
    1: {
        postId: 1,
        body: [
            'Literally de pinga tiki tiki.'
        ]
    },
    2: {
        postId: 1,
        body: [
            'Que pena supposably Pitbull flagami UM literally pero like miami flaca power love hour kendall bro. Croquetas sweetwater lonche PubSub west flagler oye morena besito fire guy Mr. 305/Worldwide.'
        ]
    },
    4: {
        postId: 2,
        body: [
            'UM west flagler caja china.'
        ]
    }
}

const mockDeletedComments = {
    3: {
        postId: 2,
        timeDeleted: Date.now() - 200000,
        body: [
            'Billete Girl Pepe upper east side super MiMo design district'
        ]
    },
    5: {
        postId: 1,
        timeDeleted: Date.now() - 100000,
        body: [
            'Que pena guateber leah arts district lonche midtown oye morena yahs.'
        ]
    }
}

const storageKeys = [
    'postCounter',
    'commentCounter',
    'posts',
    'comments',
    'deletedComments'
]

function updateDatabase(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function resetDatabaseToDefaults() {
    localStorage.setItem('postCounter', JSON.stringify(2))
    localStorage.setItem('commentCounter', JSON.stringify(5))
    localStorage.setItem('posts', JSON.stringify(mockPosts))
    localStorage.setItem('comments', JSON.stringify(mockComments))
    localStorage.setItem('deletedComments', JSON.stringify(mockDeletedComments))
}

if (storageKeys.some(key => localStorage.getItem(key) === null)) {
    resetDatabaseToDefaults()
}
