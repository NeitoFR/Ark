var maria = require('mariasql'),
moment = require('moment');

lipsum = [
    'Nullam placerat eu nulla quis finibus. Aliquam luctus enim id orci pretium, non volutpat elit sollicitudin. Morbi cursus nisl nec sem iaculis varius. Nulla at nisl erat. Maecenas et elit ac magna condimentum mollis. Pellentesque a congue velit. Aenean bibendum massa id dui volutpat fermentum. Phasellus euismod vitae risus ut tristique. Maecenas vitae tincidunt magna. Mauris elementum neque mi, quis gravida libero finibus in. Nunc blandit ornare facilisis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent ultricies ligula vitae neque congue dictum.',
    'Nunc sed dolor laoreet, ultrices ipsum vitae, sollicitudin purus. Praesent porta, nisi vel placerat suscipit, est tortor congue nulla, ut tempus mi leo vitae libero. Nam ultrices ornare ultricies. Integer aliquet urna consequat posuere lacinia. Curabitur a ornare diam. Quisque venenatis nulla metus, et ultricies nibh venenatis vitae. Proin non eros vel dolor mollis dignissim. Ut aliquet, urna in hendrerit venenatis, neque tellus feugiat turpis, at pharetra est dui eget mi. Morbi fermentum, leo eu commodo finibus, turpis lacus aliquet justo, quis efficitur dolor ipsum et quam. Nulla hendrerit sem non viverra efficitur. Aenean pretium est ut est vehicula, hendrerit porttitor lorem varius. Etiam leo tortor, pellentesque a elementum nec, molestie a augue.',
    'Phasellus blandit molestie metus, quis eleifend sem commodo sed. Phasellus malesuada ipsum ac nulla tristique interdum. Aliquam semper interdum sapien at auctor. Maecenas eleifend leo turpis, non commodo dolor tempor et. Sed placerat lorem nibh, sed malesuada nisi scelerisque eu. Sed odio sapien, placerat a leo at, pulvinar mattis ex. Phasellus maximus risus ac turpis vehicula, sed efficitur tortor congue. Quisque gravida massa massa, in hendrerit turpis pretium in. Mauris ultrices lacinia maximus. Donec pharetra ultricies lacus, in congue velit congue vitae.',
    'Nulla vel nisl nec nisi interdum commodo at quis orci. Nam ultricies diam quis molestie efficitur. Morbi bibendum augue nec eros scelerisque placerat. Vestibulum quis leo ornare, tristique nulla non, volutpat ante. Etiam vel neque dignissim, tempus ante in, aliquam dolor. Curabitur nec sapien neque. Morbi ac leo ante. Quisque pharetra, mi sed luctus dignissim, massa enim tincidunt sem, sit amet cursus tellus lectus in nisi. Donec tellus mauris, egestas vitae eros eu, mattis fermentum ligula. Nullam viverra mauris vitae arcu feugiat, in semper ex venenatis. Donec quis sapien lacinia eros congue porta et non quam.',
    'In nec felis ut elit rhoncus sollicitudin. Curabitur vitae est nec justo tempor eleifend. Maecenas vel viverra ligula. Maecenas et felis at est vestibulum fringilla in sed orci. Donec pulvinar erat mauris, condimentum placerat libero efficitur non. Maecenas et nibh at neque tincidunt scelerisque. Integer sagittis placerat turpis, sed interdum felis mollis sed. Phasellus id lacus faucibus, consequat ipsum at, tempus risus. Sed condimentum leo nec justo semper pulvinar. Aliquam tristique dolor a luctus dignissim. Maecenas dapibus, elit et pharetra efficitur, libero quam imperdiet felis, a molestie tortor est eget augue.',
    'In pretium, urna ut pulvinar dignissim, dolor orci tristique nisi, vel sagittis lorem velit ut felis. Morbi eget ante est. Cras convallis ligula nec interdum laoreet. Nulla facilisi. Nullam luctus molestie quam, fermentum malesuada dolor scelerisque sed. Nullam pulvinar quis lacus condimentum vulputate. Vivamus erat enim, dignissim laoreet quam ullamcorper, efficitur tincidunt metus. Phasellus auctor tempus libero ac ullamcorper. Aenean libero elit, semper et pharetra sed, porttitor sit amet velit. Pellentesque vel posuere ante. Donec ac dui rhoncus, finibus elit ut, finibus felis. Etiam mollis, neque eu rutrum aliquam, erat nibh sodales libero, sit amet interdum ligula augue sit amet enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu cursus neque. Nam in nisl consectetur, luctus magna eu, consequat orci.',
    'Sed risus eros, accumsan eget ligula at, aliquet facilisis lectus. Aenean tincidunt eros quis ex gravida molestie. Cras auctor dui vulputate nisi ultrices, non auctor tellus efficitur. Etiam rutrum ultrices nisi, at eleifend sapien feugiat ut. Suspendisse vulputate turpis lacus, nec ultricies dolor molestie ut. Morbi vitae iaculis libero, vel dictum odio. Aenean dictum aliquam arcu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec volutpat sem nec sapien venenatis ultricies.',
    'Donec finibus erat eget felis convallis, nec venenatis dui auctor. Aenean sagittis sit amet turpis ut fermentum. Phasellus elementum felis luctus, ornare quam at, fringilla felis. Vivamus orci ante, consequat vitae dolor vitae, laoreet elementum metus. Proin facilisis sed urna id iaculis. Sed eget augue facilisis, consequat mi eu, rutrum velit. In hac habitasse platea dictumst. Sed laoreet est non pretium vulputate. Aenean mauris odio, maximus a accumsan non, aliquet at ante. Mauris semper id lacus id tempor. Proin lacus velit, condimentum ut metus in, tempor gravida lectus. Cras ultricies ex sed ipsum vestibulum, tempus ullamcorper augue aliquam. Fusce velit ante, rutrum id tincidunt vitae, dapibus sit amet dolor. In sodales luctus iaculis. Donec consequat scelerisque maximus.',
    'Pellentesque nec urna velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus libero elit, porttitor eu orci a, hendrerit ultricies nunc. Praesent consequat mollis lobortis. Fusce sodales sit amet nulla ac vulputate. Ut convallis rutrum mauris, nec vestibulum metus ornare ut. Aliquam sed venenatis nisl. Duis consectetur nulla lacinia magna interdum, ut facilisis erat sollicitudin. Phasellus non neque sapien.'
],
continent = [
    'Asie',
    'Océanie',
    'Europe de l\'Ouest',
    'Europe de l\'Est',
    'Amérique Centrale',
    'Amérique du Sud',
    'Amérique du Nord',
    'Afrique',
    'Eurasie'
];
var body = {
    'alertName' : '',
    'summary' : '',
    'date_crea': '',
    'continent': '',
    'country': '',
    'city': '', 
    'id_Espece': '',
    'desc': '',
    'initiateur': '',
    'log': ''
};

console.log(moment(1525903200000).format("DD-MM-YYYY"));
