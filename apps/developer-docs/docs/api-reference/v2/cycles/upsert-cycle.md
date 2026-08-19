---
title: Upsert a cycle
description: Upsert a cycle with the Plane v2 REST API. Parameters, sparse `?fields=` responses, OAuth scopes, error codes, and code examples.
keywords: plane api v2, upsert a cycle, cycles, cycles upsert
---

# Upsert a cycle

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/cycles/upsert/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Cycles are time-boxed iterations in a project. Create a cycle, or update the existing one that carries the same `(external_source, external_id)` pair.

- Both `external_source` and `external_id` are required — without them there is nothing to match on and the request is a `400`.
- A created record answers `201` with `X-Plane-Upsert: created`; an updated one answers `200` with `X-Plane-Upsert: updated`. Branch on the header rather than guessing from the status.
- Upsert is safe for **sequential** importers. Two simultaneous upserts of the same key can each miss and each create, so serialize your writes per key.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="project_id" type="string" :required="true">

The project the resource belongs to. Accepts the project UUID or its bare identifier, for example `ENG`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="name" type="string" :required="true">

Display name.

Maximum 255 characters.

</ApiParam>

<ApiParam name="description" type="string" :required="false">

Free-form description.

</ApiParam>

<ApiParam name="end_date" type="string (date-time)" :required="false">

End date, as `YYYY-MM-DD`.

Nullable.

</ApiParam>

<ApiParam name="external_id" type="string" :required="false">

Your system's identifier for this record, for sync and import correlation.

Maximum 255 characters. Nullable.

</ApiParam>

<ApiParam name="external_source" type="string" :required="false">

The system `external_id` came from, for example `github` or `jira`.

Maximum 255 characters. Nullable.

</ApiParam>

<ApiParam name="logo_props" type="string" :required="false">

Editor-owned logo descriptor. Pass back what you read rather than composing it by hand.

</ApiParam>

<ApiParam name="sort_order" type="number" :required="false">

Manual ordering weight. Lower sorts first.

</ApiParam>

<ApiParam name="start_date" type="string (date-time)" :required="false">

Planned start date, as `YYYY-MM-DD`.

Nullable.

</ApiParam>

<ApiParam name="timezone" type="string" :required="false">

- `Africa/Abidjan` - Africa/Abidjan
- `Africa/Accra` - Africa/Accra
- `Africa/Addis_Ababa` - Africa/Addis_Ababa
- `Africa/Algiers` - Africa/Algiers
- `Africa/Asmara` - Africa/Asmara
- `Africa/Bamako` - Africa/Bamako
- `Africa/Bangui` - Africa/Bangui
- `Africa/Banjul` - Africa/Banjul
- `Africa/Bissau` - Africa/Bissau
- `Africa/Blantyre` - Africa/Blantyre
- `Africa/Brazzaville` - Africa/Brazzaville
- `Africa/Bujumbura` - Africa/Bujumbura
- `Africa/Cairo` - Africa/Cairo
- `Africa/Casablanca` - Africa/Casablanca
- `Africa/Ceuta` - Africa/Ceuta
- `Africa/Conakry` - Africa/Conakry
- `Africa/Dakar` - Africa/Dakar
- `Africa/Dar_es_Salaam` - Africa/Dar_es_Salaam
- `Africa/Djibouti` - Africa/Djibouti
- `Africa/Douala` - Africa/Douala
- `Africa/El_Aaiun` - Africa/El_Aaiun
- `Africa/Freetown` - Africa/Freetown
- `Africa/Gaborone` - Africa/Gaborone
- `Africa/Harare` - Africa/Harare
- `Africa/Johannesburg` - Africa/Johannesburg
- `Africa/Juba` - Africa/Juba
- `Africa/Kampala` - Africa/Kampala
- `Africa/Khartoum` - Africa/Khartoum
- `Africa/Kigali` - Africa/Kigali
- `Africa/Kinshasa` - Africa/Kinshasa
- `Africa/Lagos` - Africa/Lagos
- `Africa/Libreville` - Africa/Libreville
- `Africa/Lome` - Africa/Lome
- `Africa/Luanda` - Africa/Luanda
- `Africa/Lubumbashi` - Africa/Lubumbashi
- `Africa/Lusaka` - Africa/Lusaka
- `Africa/Malabo` - Africa/Malabo
- `Africa/Maputo` - Africa/Maputo
- `Africa/Maseru` - Africa/Maseru
- `Africa/Mbabane` - Africa/Mbabane
- `Africa/Mogadishu` - Africa/Mogadishu
- `Africa/Monrovia` - Africa/Monrovia
- `Africa/Nairobi` - Africa/Nairobi
- `Africa/Ndjamena` - Africa/Ndjamena
- `Africa/Niamey` - Africa/Niamey
- `Africa/Nouakchott` - Africa/Nouakchott
- `Africa/Ouagadougou` - Africa/Ouagadougou
- `Africa/Porto-Novo` - Africa/Porto-Novo
- `Africa/Sao_Tome` - Africa/Sao_Tome
- `Africa/Tripoli` - Africa/Tripoli
- `Africa/Tunis` - Africa/Tunis
- `Africa/Windhoek` - Africa/Windhoek
- `America/Adak` - America/Adak
- `America/Anchorage` - America/Anchorage
- `America/Anguilla` - America/Anguilla
- `America/Antigua` - America/Antigua
- `America/Araguaina` - America/Araguaina
- `America/Argentina/Buenos_Aires` - America/Argentina/Buenos_Aires
- `America/Argentina/Catamarca` - America/Argentina/Catamarca
- `America/Argentina/Cordoba` - America/Argentina/Cordoba
- `America/Argentina/Jujuy` - America/Argentina/Jujuy
- `America/Argentina/La_Rioja` - America/Argentina/La_Rioja
- `America/Argentina/Mendoza` - America/Argentina/Mendoza
- `America/Argentina/Rio_Gallegos` - America/Argentina/Rio_Gallegos
- `America/Argentina/Salta` - America/Argentina/Salta
- `America/Argentina/San_Juan` - America/Argentina/San_Juan
- `America/Argentina/San_Luis` - America/Argentina/San_Luis
- `America/Argentina/Tucuman` - America/Argentina/Tucuman
- `America/Argentina/Ushuaia` - America/Argentina/Ushuaia
- `America/Aruba` - America/Aruba
- `America/Asuncion` - America/Asuncion
- `America/Atikokan` - America/Atikokan
- `America/Bahia` - America/Bahia
- `America/Bahia_Banderas` - America/Bahia_Banderas
- `America/Barbados` - America/Barbados
- `America/Belem` - America/Belem
- `America/Belize` - America/Belize
- `America/Blanc-Sablon` - America/Blanc-Sablon
- `America/Boa_Vista` - America/Boa_Vista
- `America/Bogota` - America/Bogota
- `America/Boise` - America/Boise
- `America/Cambridge_Bay` - America/Cambridge_Bay
- `America/Campo_Grande` - America/Campo_Grande
- `America/Cancun` - America/Cancun
- `America/Caracas` - America/Caracas
- `America/Cayenne` - America/Cayenne
- `America/Cayman` - America/Cayman
- `America/Chicago` - America/Chicago
- `America/Chihuahua` - America/Chihuahua
- `America/Ciudad_Juarez` - America/Ciudad_Juarez
- `America/Costa_Rica` - America/Costa_Rica
- `America/Creston` - America/Creston
- `America/Cuiaba` - America/Cuiaba
- `America/Curacao` - America/Curacao
- `America/Danmarkshavn` - America/Danmarkshavn
- `America/Dawson` - America/Dawson
- `America/Dawson_Creek` - America/Dawson_Creek
- `America/Denver` - America/Denver
- `America/Detroit` - America/Detroit
- `America/Dominica` - America/Dominica
- `America/Edmonton` - America/Edmonton
- `America/Eirunepe` - America/Eirunepe
- `America/El_Salvador` - America/El_Salvador
- `America/Fort_Nelson` - America/Fort_Nelson
- `America/Fortaleza` - America/Fortaleza
- `America/Glace_Bay` - America/Glace_Bay
- `America/Goose_Bay` - America/Goose_Bay
- `America/Grand_Turk` - America/Grand_Turk
- `America/Grenada` - America/Grenada
- `America/Guadeloupe` - America/Guadeloupe
- `America/Guatemala` - America/Guatemala
- `America/Guayaquil` - America/Guayaquil
- `America/Guyana` - America/Guyana
- `America/Halifax` - America/Halifax
- `America/Havana` - America/Havana
- `America/Hermosillo` - America/Hermosillo
- `America/Indiana/Indianapolis` - America/Indiana/Indianapolis
- `America/Indiana/Knox` - America/Indiana/Knox
- `America/Indiana/Marengo` - America/Indiana/Marengo
- `America/Indiana/Petersburg` - America/Indiana/Petersburg
- `America/Indiana/Tell_City` - America/Indiana/Tell_City
- `America/Indiana/Vevay` - America/Indiana/Vevay
- `America/Indiana/Vincennes` - America/Indiana/Vincennes
- `America/Indiana/Winamac` - America/Indiana/Winamac
- `America/Inuvik` - America/Inuvik
- `America/Iqaluit` - America/Iqaluit
- `America/Jamaica` - America/Jamaica
- `America/Juneau` - America/Juneau
- `America/Kentucky/Louisville` - America/Kentucky/Louisville
- `America/Kentucky/Monticello` - America/Kentucky/Monticello
- `America/Kralendijk` - America/Kralendijk
- `America/La_Paz` - America/La_Paz
- `America/Lima` - America/Lima
- `America/Los_Angeles` - America/Los_Angeles
- `America/Lower_Princes` - America/Lower_Princes
- `America/Maceio` - America/Maceio
- `America/Managua` - America/Managua
- `America/Manaus` - America/Manaus
- `America/Marigot` - America/Marigot
- `America/Martinique` - America/Martinique
- `America/Matamoros` - America/Matamoros
- `America/Mazatlan` - America/Mazatlan
- `America/Menominee` - America/Menominee
- `America/Merida` - America/Merida
- `America/Metlakatla` - America/Metlakatla
- `America/Mexico_City` - America/Mexico_City
- `America/Miquelon` - America/Miquelon
- `America/Moncton` - America/Moncton
- `America/Monterrey` - America/Monterrey
- `America/Montevideo` - America/Montevideo
- `America/Montserrat` - America/Montserrat
- `America/Nassau` - America/Nassau
- `America/New_York` - America/New_York
- `America/Nome` - America/Nome
- `America/Noronha` - America/Noronha
- `America/North_Dakota/Beulah` - America/North_Dakota/Beulah
- `America/North_Dakota/Center` - America/North_Dakota/Center
- `America/North_Dakota/New_Salem` - America/North_Dakota/New_Salem
- `America/Nuuk` - America/Nuuk
- `America/Ojinaga` - America/Ojinaga
- `America/Panama` - America/Panama
- `America/Paramaribo` - America/Paramaribo
- `America/Phoenix` - America/Phoenix
- `America/Port-au-Prince` - America/Port-au-Prince
- `America/Port_of_Spain` - America/Port_of_Spain
- `America/Porto_Velho` - America/Porto_Velho
- `America/Puerto_Rico` - America/Puerto_Rico
- `America/Punta_Arenas` - America/Punta_Arenas
- `America/Rankin_Inlet` - America/Rankin_Inlet
- `America/Recife` - America/Recife
- `America/Regina` - America/Regina
- `America/Resolute` - America/Resolute
- `America/Rio_Branco` - America/Rio_Branco
- `America/Santarem` - America/Santarem
- `America/Santiago` - America/Santiago
- `America/Santo_Domingo` - America/Santo_Domingo
- `America/Sao_Paulo` - America/Sao_Paulo
- `America/Scoresbysund` - America/Scoresbysund
- `America/Sitka` - America/Sitka
- `America/St_Barthelemy` - America/St_Barthelemy
- `America/St_Johns` - America/St_Johns
- `America/St_Kitts` - America/St_Kitts
- `America/St_Lucia` - America/St_Lucia
- `America/St_Thomas` - America/St_Thomas
- `America/St_Vincent` - America/St_Vincent
- `America/Swift_Current` - America/Swift_Current
- `America/Tegucigalpa` - America/Tegucigalpa
- `America/Thule` - America/Thule
- `America/Tijuana` - America/Tijuana
- `America/Toronto` - America/Toronto
- `America/Tortola` - America/Tortola
- `America/Vancouver` - America/Vancouver
- `America/Whitehorse` - America/Whitehorse
- `America/Winnipeg` - America/Winnipeg
- `America/Yakutat` - America/Yakutat
- `Antarctica/Casey` - Antarctica/Casey
- `Antarctica/Davis` - Antarctica/Davis
- `Antarctica/DumontDUrville` - Antarctica/DumontDUrville
- `Antarctica/Macquarie` - Antarctica/Macquarie
- `Antarctica/Mawson` - Antarctica/Mawson
- `Antarctica/McMurdo` - Antarctica/McMurdo
- `Antarctica/Palmer` - Antarctica/Palmer
- `Antarctica/Rothera` - Antarctica/Rothera
- `Antarctica/Syowa` - Antarctica/Syowa
- `Antarctica/Troll` - Antarctica/Troll
- `Antarctica/Vostok` - Antarctica/Vostok
- `Arctic/Longyearbyen` - Arctic/Longyearbyen
- `Asia/Aden` - Asia/Aden
- `Asia/Almaty` - Asia/Almaty
- `Asia/Amman` - Asia/Amman
- `Asia/Anadyr` - Asia/Anadyr
- `Asia/Aqtau` - Asia/Aqtau
- `Asia/Aqtobe` - Asia/Aqtobe
- `Asia/Ashgabat` - Asia/Ashgabat
- `Asia/Atyrau` - Asia/Atyrau
- `Asia/Baghdad` - Asia/Baghdad
- `Asia/Bahrain` - Asia/Bahrain
- `Asia/Baku` - Asia/Baku
- `Asia/Bangkok` - Asia/Bangkok
- `Asia/Barnaul` - Asia/Barnaul
- `Asia/Beirut` - Asia/Beirut
- `Asia/Bishkek` - Asia/Bishkek
- `Asia/Brunei` - Asia/Brunei
- `Asia/Chita` - Asia/Chita
- `Asia/Choibalsan` - Asia/Choibalsan
- `Asia/Colombo` - Asia/Colombo
- `Asia/Damascus` - Asia/Damascus
- `Asia/Dhaka` - Asia/Dhaka
- `Asia/Dili` - Asia/Dili
- `Asia/Dubai` - Asia/Dubai
- `Asia/Dushanbe` - Asia/Dushanbe
- `Asia/Famagusta` - Asia/Famagusta
- `Asia/Gaza` - Asia/Gaza
- `Asia/Hebron` - Asia/Hebron
- `Asia/Ho_Chi_Minh` - Asia/Ho_Chi_Minh
- `Asia/Hong_Kong` - Asia/Hong_Kong
- `Asia/Hovd` - Asia/Hovd
- `Asia/Irkutsk` - Asia/Irkutsk
- `Asia/Jakarta` - Asia/Jakarta
- `Asia/Jayapura` - Asia/Jayapura
- `Asia/Jerusalem` - Asia/Jerusalem
- `Asia/Kabul` - Asia/Kabul
- `Asia/Kamchatka` - Asia/Kamchatka
- `Asia/Karachi` - Asia/Karachi
- `Asia/Kathmandu` - Asia/Kathmandu
- `Asia/Khandyga` - Asia/Khandyga
- `Asia/Kolkata` - Asia/Kolkata
- `Asia/Krasnoyarsk` - Asia/Krasnoyarsk
- `Asia/Kuala_Lumpur` - Asia/Kuala_Lumpur
- `Asia/Kuching` - Asia/Kuching
- `Asia/Kuwait` - Asia/Kuwait
- `Asia/Macau` - Asia/Macau
- `Asia/Magadan` - Asia/Magadan
- `Asia/Makassar` - Asia/Makassar
- `Asia/Manila` - Asia/Manila
- `Asia/Muscat` - Asia/Muscat
- `Asia/Nicosia` - Asia/Nicosia
- `Asia/Novokuznetsk` - Asia/Novokuznetsk
- `Asia/Novosibirsk` - Asia/Novosibirsk
- `Asia/Omsk` - Asia/Omsk
- `Asia/Oral` - Asia/Oral
- `Asia/Phnom_Penh` - Asia/Phnom_Penh
- `Asia/Pontianak` - Asia/Pontianak
- `Asia/Pyongyang` - Asia/Pyongyang
- `Asia/Qatar` - Asia/Qatar
- `Asia/Qostanay` - Asia/Qostanay
- `Asia/Qyzylorda` - Asia/Qyzylorda
- `Asia/Riyadh` - Asia/Riyadh
- `Asia/Sakhalin` - Asia/Sakhalin
- `Asia/Samarkand` - Asia/Samarkand
- `Asia/Seoul` - Asia/Seoul
- `Asia/Shanghai` - Asia/Shanghai
- `Asia/Singapore` - Asia/Singapore
- `Asia/Srednekolymsk` - Asia/Srednekolymsk
- `Asia/Taipei` - Asia/Taipei
- `Asia/Tashkent` - Asia/Tashkent
- `Asia/Tbilisi` - Asia/Tbilisi
- `Asia/Tehran` - Asia/Tehran
- `Asia/Thimphu` - Asia/Thimphu
- `Asia/Tokyo` - Asia/Tokyo
- `Asia/Tomsk` - Asia/Tomsk
- `Asia/Ulaanbaatar` - Asia/Ulaanbaatar
- `Asia/Urumqi` - Asia/Urumqi
- `Asia/Ust-Nera` - Asia/Ust-Nera
- `Asia/Vientiane` - Asia/Vientiane
- `Asia/Vladivostok` - Asia/Vladivostok
- `Asia/Yakutsk` - Asia/Yakutsk
- `Asia/Yangon` - Asia/Yangon
- `Asia/Yekaterinburg` - Asia/Yekaterinburg
- `Asia/Yerevan` - Asia/Yerevan
- `Atlantic/Azores` - Atlantic/Azores
- `Atlantic/Bermuda` - Atlantic/Bermuda
- `Atlantic/Canary` - Atlantic/Canary
- `Atlantic/Cape_Verde` - Atlantic/Cape_Verde
- `Atlantic/Faroe` - Atlantic/Faroe
- `Atlantic/Madeira` - Atlantic/Madeira
- `Atlantic/Reykjavik` - Atlantic/Reykjavik
- `Atlantic/South_Georgia` - Atlantic/South_Georgia
- `Atlantic/St_Helena` - Atlantic/St_Helena
- `Atlantic/Stanley` - Atlantic/Stanley
- `Australia/Adelaide` - Australia/Adelaide
- `Australia/Brisbane` - Australia/Brisbane
- `Australia/Broken_Hill` - Australia/Broken_Hill
- `Australia/Darwin` - Australia/Darwin
- `Australia/Eucla` - Australia/Eucla
- `Australia/Hobart` - Australia/Hobart
- `Australia/Lindeman` - Australia/Lindeman
- `Australia/Lord_Howe` - Australia/Lord_Howe
- `Australia/Melbourne` - Australia/Melbourne
- `Australia/Perth` - Australia/Perth
- `Australia/Sydney` - Australia/Sydney
- `Canada/Atlantic` - Canada/Atlantic
- `Canada/Central` - Canada/Central
- `Canada/Eastern` - Canada/Eastern
- `Canada/Mountain` - Canada/Mountain
- `Canada/Newfoundland` - Canada/Newfoundland
- `Canada/Pacific` - Canada/Pacific
- `Europe/Amsterdam` - Europe/Amsterdam
- `Europe/Andorra` - Europe/Andorra
- `Europe/Astrakhan` - Europe/Astrakhan
- `Europe/Athens` - Europe/Athens
- `Europe/Belgrade` - Europe/Belgrade
- `Europe/Berlin` - Europe/Berlin
- `Europe/Bratislava` - Europe/Bratislava
- `Europe/Brussels` - Europe/Brussels
- `Europe/Bucharest` - Europe/Bucharest
- `Europe/Budapest` - Europe/Budapest
- `Europe/Busingen` - Europe/Busingen
- `Europe/Chisinau` - Europe/Chisinau
- `Europe/Copenhagen` - Europe/Copenhagen
- `Europe/Dublin` - Europe/Dublin
- `Europe/Gibraltar` - Europe/Gibraltar
- `Europe/Guernsey` - Europe/Guernsey
- `Europe/Helsinki` - Europe/Helsinki
- `Europe/Isle_of_Man` - Europe/Isle_of_Man
- `Europe/Istanbul` - Europe/Istanbul
- `Europe/Jersey` - Europe/Jersey
- `Europe/Kaliningrad` - Europe/Kaliningrad
- `Europe/Kirov` - Europe/Kirov
- `Europe/Kyiv` - Europe/Kyiv
- `Europe/Lisbon` - Europe/Lisbon
- `Europe/Ljubljana` - Europe/Ljubljana
- `Europe/London` - Europe/London
- `Europe/Luxembourg` - Europe/Luxembourg
- `Europe/Madrid` - Europe/Madrid
- `Europe/Malta` - Europe/Malta
- `Europe/Mariehamn` - Europe/Mariehamn
- `Europe/Minsk` - Europe/Minsk
- `Europe/Monaco` - Europe/Monaco
- `Europe/Moscow` - Europe/Moscow
- `Europe/Oslo` - Europe/Oslo
- `Europe/Paris` - Europe/Paris
- `Europe/Podgorica` - Europe/Podgorica
- `Europe/Prague` - Europe/Prague
- `Europe/Riga` - Europe/Riga
- `Europe/Rome` - Europe/Rome
- `Europe/Samara` - Europe/Samara
- `Europe/San_Marino` - Europe/San_Marino
- `Europe/Sarajevo` - Europe/Sarajevo
- `Europe/Saratov` - Europe/Saratov
- `Europe/Simferopol` - Europe/Simferopol
- `Europe/Skopje` - Europe/Skopje
- `Europe/Sofia` - Europe/Sofia
- `Europe/Stockholm` - Europe/Stockholm
- `Europe/Tallinn` - Europe/Tallinn
- `Europe/Tirane` - Europe/Tirane
- `Europe/Ulyanovsk` - Europe/Ulyanovsk
- `Europe/Vaduz` - Europe/Vaduz
- `Europe/Vatican` - Europe/Vatican
- `Europe/Vienna` - Europe/Vienna
- `Europe/Vilnius` - Europe/Vilnius
- `Europe/Volgograd` - Europe/Volgograd
- `Europe/Warsaw` - Europe/Warsaw
- `Europe/Zagreb` - Europe/Zagreb
- `Europe/Zurich` - Europe/Zurich
- `GMT` - GMT
- `Indian/Antananarivo` - Indian/Antananarivo
- `Indian/Chagos` - Indian/Chagos
- `Indian/Christmas` - Indian/Christmas
- `Indian/Cocos` - Indian/Cocos
- `Indian/Comoro` - Indian/Comoro
- `Indian/Kerguelen` - Indian/Kerguelen
- `Indian/Mahe` - Indian/Mahe
- `Indian/Maldives` - Indian/Maldives
- `Indian/Mauritius` - Indian/Mauritius
- `Indian/Mayotte` - Indian/Mayotte
- `Indian/Reunion` - Indian/Reunion
- `Pacific/Apia` - Pacific/Apia
- `Pacific/Auckland` - Pacific/Auckland
- `Pacific/Bougainville` - Pacific/Bougainville
- `Pacific/Chatham` - Pacific/Chatham
- `Pacific/Chuuk` - Pacific/Chuuk
- `Pacific/Easter` - Pacific/Easter
- `Pacific/Efate` - Pacific/Efate
- `Pacific/Fakaofo` - Pacific/Fakaofo
- `Pacific/Fiji` - Pacific/Fiji
- `Pacific/Funafuti` - Pacific/Funafuti
- `Pacific/Galapagos` - Pacific/Galapagos
- `Pacific/Gambier` - Pacific/Gambier
- `Pacific/Guadalcanal` - Pacific/Guadalcanal
- `Pacific/Guam` - Pacific/Guam
- `Pacific/Honolulu` - Pacific/Honolulu
- `Pacific/Kanton` - Pacific/Kanton
- `Pacific/Kiritimati` - Pacific/Kiritimati
- `Pacific/Kosrae` - Pacific/Kosrae
- `Pacific/Kwajalein` - Pacific/Kwajalein
- `Pacific/Majuro` - Pacific/Majuro
- `Pacific/Marquesas` - Pacific/Marquesas
- `Pacific/Midway` - Pacific/Midway
- `Pacific/Nauru` - Pacific/Nauru
- `Pacific/Niue` - Pacific/Niue
- `Pacific/Norfolk` - Pacific/Norfolk
- `Pacific/Noumea` - Pacific/Noumea
- `Pacific/Pago_Pago` - Pacific/Pago_Pago
- `Pacific/Palau` - Pacific/Palau
- `Pacific/Pitcairn` - Pacific/Pitcairn
- `Pacific/Pohnpei` - Pacific/Pohnpei
- `Pacific/Port_Moresby` - Pacific/Port_Moresby
- `Pacific/Rarotonga` - Pacific/Rarotonga
- `Pacific/Saipan` - Pacific/Saipan
- `Pacific/Tahiti` - Pacific/Tahiti
- `Pacific/Tarawa` - Pacific/Tarawa
- `Pacific/Tongatapu` - Pacific/Tongatapu
- `Pacific/Wake` - Pacific/Wake
- `Pacific/Wallis` - Pacific/Wallis
- `US/Alaska` - US/Alaska
- `US/Arizona` - US/Arizona
- `US/Central` - US/Central
- `US/Eastern` - US/Eastern
- `US/Hawaii` - US/Hawaii
- `US/Mountain` - US/Mountain
- `US/Pacific` - US/Pacific
- `UTC` - UTC

One of `Africa/Abidjan`, `Africa/Accra`, `Africa/Addis_Ababa`, `Africa/Algiers`, `Africa/Asmara`, `Africa/Bamako`, `Africa/Bangui`, `Africa/Banjul`, `Africa/Bissau`, `Africa/Blantyre`, `Africa/Brazzaville`, `Africa/Bujumbura`, `Africa/Cairo`, `Africa/Casablanca`, `Africa/Ceuta`, `Africa/Conakry`, `Africa/Dakar`, `Africa/Dar_es_Salaam`, `Africa/Djibouti`, `Africa/Douala`, `Africa/El_Aaiun`, `Africa/Freetown`, `Africa/Gaborone`, `Africa/Harare`, `Africa/Johannesburg`, `Africa/Juba`, `Africa/Kampala`, `Africa/Khartoum`, `Africa/Kigali`, `Africa/Kinshasa`, `Africa/Lagos`, `Africa/Libreville`, `Africa/Lome`, `Africa/Luanda`, `Africa/Lubumbashi`, `Africa/Lusaka`, `Africa/Malabo`, `Africa/Maputo`, `Africa/Maseru`, `Africa/Mbabane`, `Africa/Mogadishu`, `Africa/Monrovia`, `Africa/Nairobi`, `Africa/Ndjamena`, `Africa/Niamey`, `Africa/Nouakchott`, `Africa/Ouagadougou`, `Africa/Porto-Novo`, `Africa/Sao_Tome`, `Africa/Tripoli`, `Africa/Tunis`, `Africa/Windhoek`, `America/Adak`, `America/Anchorage`, `America/Anguilla`, `America/Antigua`, `America/Araguaina`, `America/Argentina/Buenos_Aires`, `America/Argentina/Catamarca`, `America/Argentina/Cordoba`, `America/Argentina/Jujuy`, `America/Argentina/La_Rioja`, `America/Argentina/Mendoza`, `America/Argentina/Rio_Gallegos`, `America/Argentina/Salta`, `America/Argentina/San_Juan`, `America/Argentina/San_Luis`, `America/Argentina/Tucuman`, `America/Argentina/Ushuaia`, `America/Aruba`, `America/Asuncion`, `America/Atikokan`, `America/Bahia`, `America/Bahia_Banderas`, `America/Barbados`, `America/Belem`, `America/Belize`, `America/Blanc-Sablon`, `America/Boa_Vista`, `America/Bogota`, `America/Boise`, `America/Cambridge_Bay`, `America/Campo_Grande`, `America/Cancun`, `America/Caracas`, `America/Cayenne`, `America/Cayman`, `America/Chicago`, `America/Chihuahua`, `America/Ciudad_Juarez`, `America/Costa_Rica`, `America/Creston`, `America/Cuiaba`, `America/Curacao`, `America/Danmarkshavn`, `America/Dawson`, `America/Dawson_Creek`, `America/Denver`, `America/Detroit`, `America/Dominica`, `America/Edmonton`, `America/Eirunepe`, `America/El_Salvador`, `America/Fort_Nelson`, `America/Fortaleza`, `America/Glace_Bay`, `America/Goose_Bay`, `America/Grand_Turk`, `America/Grenada`, `America/Guadeloupe`, `America/Guatemala`, `America/Guayaquil`, `America/Guyana`, `America/Halifax`, `America/Havana`, `America/Hermosillo`, `America/Indiana/Indianapolis`, `America/Indiana/Knox`, `America/Indiana/Marengo`, `America/Indiana/Petersburg`, `America/Indiana/Tell_City`, `America/Indiana/Vevay`, `America/Indiana/Vincennes`, `America/Indiana/Winamac`, `America/Inuvik`, `America/Iqaluit`, `America/Jamaica`, `America/Juneau`, `America/Kentucky/Louisville`, `America/Kentucky/Monticello`, `America/Kralendijk`, `America/La_Paz`, `America/Lima`, `America/Los_Angeles`, `America/Lower_Princes`, `America/Maceio`, `America/Managua`, `America/Manaus`, `America/Marigot`, `America/Martinique`, `America/Matamoros`, `America/Mazatlan`, `America/Menominee`, `America/Merida`, `America/Metlakatla`, `America/Mexico_City`, `America/Miquelon`, `America/Moncton`, `America/Monterrey`, `America/Montevideo`, `America/Montserrat`, `America/Nassau`, `America/New_York`, `America/Nome`, `America/Noronha`, `America/North_Dakota/Beulah`, `America/North_Dakota/Center`, `America/North_Dakota/New_Salem`, `America/Nuuk`, `America/Ojinaga`, `America/Panama`, `America/Paramaribo`, `America/Phoenix`, `America/Port-au-Prince`, `America/Port_of_Spain`, `America/Porto_Velho`, `America/Puerto_Rico`, `America/Punta_Arenas`, `America/Rankin_Inlet`, `America/Recife`, `America/Regina`, `America/Resolute`, `America/Rio_Branco`, `America/Santarem`, `America/Santiago`, `America/Santo_Domingo`, `America/Sao_Paulo`, `America/Scoresbysund`, `America/Sitka`, `America/St_Barthelemy`, `America/St_Johns`, `America/St_Kitts`, `America/St_Lucia`, `America/St_Thomas`, `America/St_Vincent`, `America/Swift_Current`, `America/Tegucigalpa`, `America/Thule`, `America/Tijuana`, `America/Toronto`, `America/Tortola`, `America/Vancouver`, `America/Whitehorse`, `America/Winnipeg`, `America/Yakutat`, `Antarctica/Casey`, `Antarctica/Davis`, `Antarctica/DumontDUrville`, `Antarctica/Macquarie`, `Antarctica/Mawson`, `Antarctica/McMurdo`, `Antarctica/Palmer`, `Antarctica/Rothera`, `Antarctica/Syowa`, `Antarctica/Troll`, `Antarctica/Vostok`, `Arctic/Longyearbyen`, `Asia/Aden`, `Asia/Almaty`, `Asia/Amman`, `Asia/Anadyr`, `Asia/Aqtau`, `Asia/Aqtobe`, `Asia/Ashgabat`, `Asia/Atyrau`, `Asia/Baghdad`, `Asia/Bahrain`, `Asia/Baku`, `Asia/Bangkok`, `Asia/Barnaul`, `Asia/Beirut`, `Asia/Bishkek`, `Asia/Brunei`, `Asia/Chita`, `Asia/Choibalsan`, `Asia/Colombo`, `Asia/Damascus`, `Asia/Dhaka`, `Asia/Dili`, `Asia/Dubai`, `Asia/Dushanbe`, `Asia/Famagusta`, `Asia/Gaza`, `Asia/Hebron`, `Asia/Ho_Chi_Minh`, `Asia/Hong_Kong`, `Asia/Hovd`, `Asia/Irkutsk`, `Asia/Jakarta`, `Asia/Jayapura`, `Asia/Jerusalem`, `Asia/Kabul`, `Asia/Kamchatka`, `Asia/Karachi`, `Asia/Kathmandu`, `Asia/Khandyga`, `Asia/Kolkata`, `Asia/Krasnoyarsk`, `Asia/Kuala_Lumpur`, `Asia/Kuching`, `Asia/Kuwait`, `Asia/Macau`, `Asia/Magadan`, `Asia/Makassar`, `Asia/Manila`, `Asia/Muscat`, `Asia/Nicosia`, `Asia/Novokuznetsk`, `Asia/Novosibirsk`, `Asia/Omsk`, `Asia/Oral`, `Asia/Phnom_Penh`, `Asia/Pontianak`, `Asia/Pyongyang`, `Asia/Qatar`, `Asia/Qostanay`, `Asia/Qyzylorda`, `Asia/Riyadh`, `Asia/Sakhalin`, `Asia/Samarkand`, `Asia/Seoul`, `Asia/Shanghai`, `Asia/Singapore`, `Asia/Srednekolymsk`, `Asia/Taipei`, `Asia/Tashkent`, `Asia/Tbilisi`, `Asia/Tehran`, `Asia/Thimphu`, `Asia/Tokyo`, `Asia/Tomsk`, `Asia/Ulaanbaatar`, `Asia/Urumqi`, `Asia/Ust-Nera`, `Asia/Vientiane`, `Asia/Vladivostok`, `Asia/Yakutsk`, `Asia/Yangon`, `Asia/Yekaterinburg`, `Asia/Yerevan`, `Atlantic/Azores`, `Atlantic/Bermuda`, `Atlantic/Canary`, `Atlantic/Cape_Verde`, `Atlantic/Faroe`, `Atlantic/Madeira`, `Atlantic/Reykjavik`, `Atlantic/South_Georgia`, `Atlantic/St_Helena`, `Atlantic/Stanley`, `Australia/Adelaide`, `Australia/Brisbane`, `Australia/Broken_Hill`, `Australia/Darwin`, `Australia/Eucla`, `Australia/Hobart`, `Australia/Lindeman`, `Australia/Lord_Howe`, `Australia/Melbourne`, `Australia/Perth`, `Australia/Sydney`, `Canada/Atlantic`, `Canada/Central`, `Canada/Eastern`, `Canada/Mountain`, `Canada/Newfoundland`, `Canada/Pacific`, `Europe/Amsterdam`, `Europe/Andorra`, `Europe/Astrakhan`, `Europe/Athens`, `Europe/Belgrade`, `Europe/Berlin`, `Europe/Bratislava`, `Europe/Brussels`, `Europe/Bucharest`, `Europe/Budapest`, `Europe/Busingen`, `Europe/Chisinau`, `Europe/Copenhagen`, `Europe/Dublin`, `Europe/Gibraltar`, `Europe/Guernsey`, `Europe/Helsinki`, `Europe/Isle_of_Man`, `Europe/Istanbul`, `Europe/Jersey`, `Europe/Kaliningrad`, `Europe/Kirov`, `Europe/Kyiv`, `Europe/Lisbon`, `Europe/Ljubljana`, `Europe/London`, `Europe/Luxembourg`, `Europe/Madrid`, `Europe/Malta`, `Europe/Mariehamn`, `Europe/Minsk`, `Europe/Monaco`, `Europe/Moscow`, `Europe/Oslo`, `Europe/Paris`, `Europe/Podgorica`, `Europe/Prague`, `Europe/Riga`, `Europe/Rome`, `Europe/Samara`, `Europe/San_Marino`, `Europe/Sarajevo`, `Europe/Saratov`, `Europe/Simferopol`, `Europe/Skopje`, `Europe/Sofia`, `Europe/Stockholm`, `Europe/Tallinn`, `Europe/Tirane`, `Europe/Ulyanovsk`, `Europe/Vaduz`, `Europe/Vatican`, `Europe/Vienna`, `Europe/Vilnius`, `Europe/Volgograd`, `Europe/Warsaw`, `Europe/Zagreb`, `Europe/Zurich`, `GMT`, `Indian/Antananarivo`, `Indian/Chagos`, `Indian/Christmas`, `Indian/Cocos`, `Indian/Comoro`, `Indian/Kerguelen`, `Indian/Mahe`, `Indian/Maldives`, `Indian/Mauritius`, `Indian/Mayotte`, `Indian/Reunion`, `Pacific/Apia`, `Pacific/Auckland`, `Pacific/Bougainville`, `Pacific/Chatham`, `Pacific/Chuuk`, `Pacific/Easter`, `Pacific/Efate`, `Pacific/Fakaofo`, `Pacific/Fiji`, `Pacific/Funafuti`, `Pacific/Galapagos`, `Pacific/Gambier`, `Pacific/Guadalcanal`, `Pacific/Guam`, `Pacific/Honolulu`, `Pacific/Kanton`, `Pacific/Kiritimati`, `Pacific/Kosrae`, `Pacific/Kwajalein`, `Pacific/Majuro`, `Pacific/Marquesas`, `Pacific/Midway`, `Pacific/Nauru`, `Pacific/Niue`, `Pacific/Norfolk`, `Pacific/Noumea`, `Pacific/Pago_Pago`, `Pacific/Palau`, `Pacific/Pitcairn`, `Pacific/Pohnpei`, `Pacific/Port_Moresby`, `Pacific/Rarotonga`, `Pacific/Saipan`, `Pacific/Tahiti`, `Pacific/Tarawa`, `Pacific/Tongatapu`, `Pacific/Wake`, `Pacific/Wallis`, `US/Alaska`, `US/Arizona`, `US/Central`, `US/Eastern`, `US/Hawaii`, `US/Mountain`, `US/Pacific`, `UTC`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Response shaping

<div class="params-list">

<ApiParam name="fields" type="string" :required="false">

Comma-separated list of fields to return. Unrequested keys are **omitted**, not returned as `null`. `id` always comes back. Pass `all` for every requestable field. An unknown name is a `400`. See [Sparse fields](/api-reference/v2/sparse-fields).

Requestable here: `created_at`, `created_by_id`, `description`, `end_date`, `external_id`, `external_source`, `id`, `logo_props`, `name`, `owned_by_id`, `sort_order`, `start_date`, `timezone`.

</ApiParam>

<ApiParam name="expand" type="string" :required="false">

Comma-separated relations to embed: `owned_by`.

Expansion is separate-key — `?expand=state` keeps `state_id` and adds a `state` object next to it. `?fields=` and `?expand=` are independent: naming a relation in `?fields=` is a `400`, and expanded objects survive field filtering. See [Expanding relations](/api-reference/v2/expanding-relations).

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.cycles:write`

</div>

<div class="params-section">

### Errors

| Status | Code                     | Cause                                                                               |
| ------ | ------------------------ | ----------------------------------------------------------------------------------- |
| `400`  | `invalid_request`        | The request body or a query parameter failed validation.                            |
| `401`  | `unauthorized`           | Missing or invalid credentials.                                                     |
| `402`  | `payment_required`       | The feature this endpoint belongs to isn't enabled on your plan or is switched off. |
| `403`  | `forbidden`              | Your role or token scope doesn't allow this.                                        |
| `404`  | `not_found`              | No such resource, or it's outside your tenant.                                      |
| `406`  | `not_acceptable`         | The `Accept` header asks for a representation the API can't produce.                |
| `409`  | `conflict`               | A business rule blocks the write — see the notes above.                             |
| `413`  | `payload_too_large`      | The request body is over the size limit.                                            |
| `415`  | `unsupported_media_type` | The `Content-Type` isn't one this endpoint accepts.                                 |
| `429`  | `rate_limited`           | Throttled. Honor the `Retry-After` header before retrying.                          |

</div>

</div>

<div class="api-right">

<CodePanel title="Upsert a cycle" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/cycles/upsert/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "name": "Example name",
  "description": "What this is for.",
  "end_date": "2026-01-31",
  "external_id": null
}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/cycles/upsert/",
    headers={"X-Api-Key": "your-api-key"},
    json={
        "name": "Example name",
        "description": "What this is for.",
        "end_date": "2026-01-31",
        "external_id": None
    },
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/cycles/upsert/",
  {
    method: "POST",
    headers: {
      "X-Api-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Example name",
      description: "What this is for.",
      end_date: "2026-01-31",
      external_id: null,
    }),
  },
);
const data = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="200">

```json
{
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "description": "What this is for.",
  "end_date": "2026-01-31",
  "external_id": null,
  "external_source": null,
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "logo_props": null,
  "name": "Example name",
  "owned_by_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "sort_order": 65535,
  "start_date": "2026-01-12",
  "timezone": "Africa/Abidjan"
}
```

</ResponsePanel>

</div>
</div>
