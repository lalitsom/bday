
// hashed answer for each level to match
const answers = {
    "level1": "73475cb40a568e8da8a045ced110137e159f890ac4da883b6b17dc651b3a8049",
    "level2": "811786ad1ae74adfdd20dd0372abaaebc6246e343aebd01da0bfc4c02bf0106c",
    "level3": "811786ad1ae74adfdd20dd0372abaaebc6246e343aebd01da0bfc4c02bf0106c",
    "level4": "811786ad1ae74adfdd20dd0372abaaebc6246e343aebd01da0bfc4c02bf0106c",
    "level5": "811786ad1ae74adfdd20dd0372abaaebc6246e343aebd01da0bfc4c02bf0106c",
    "level6": "811786ad1ae74adfdd20dd0372abaaebc6246e343aebd01da0bfc4c02bf0106c",
    "level7": "811786ad1ae74adfdd20dd0372abaaebc6246e343aebd01da0bfc4c02bf0106c",
    "level8": "811786ad1ae74adfdd20dd0372abaaebc6246e343aebd01da0bfc4c02bf0106c",
    "level9": "811786ad1ae74adfdd20dd0372abaaebc6246e343aebd01da0bfc4c02bf0106c",
    "level10": "811786ad1ae74adfdd20dd0372abaaebc6246e343aebd01da0bfc4c02bf0106c",
    "level11": "811786ad1ae74adfdd20dd0372abaaebc6246e343aebd01da0bfc4c02bf0106c"
}

// encrypted blob of each level, which gets decrected and pasted in html whenever previous level is cleared
// decrypted by unhashed answer of previous level as key
const levelCode = {
    "level2": "53616c7465645f5f5225b4cbb6e52032bca7d8e9f7cb7dc4cc1003b1c5d0d513",
    "level3": "53616c7465645f5f5225b4cbb6e52032bca7d8e9f7cb7dc4cc1003b1c5d0d513",
    "level4": "53616c7465645f5f5225b4cbb6e52032bca7d8e9f7cb7dc4cc1003b1c5d0d513",
    "level5": "53616c7465645f5f5225b4cbb6e52032bca7d8e9f7cb7dc4cc1003b1c5d0d513",
    "level6": "53616c7465645f5f5225b4cbb6e52032bca7d8e9f7cb7dc4cc1003b1c5d0d513",
    "level7": "53616c7465645f5f5225b4cbb6e52032bca7d8e9f7cb7dc4cc1003b1c5d0d513",
    "level8": "53616c7465645f5f5225b4cbb6e52032bca7d8e9f7cb7dc4cc1003b1c5d0d513",
    "level9": "53616c7465645f5f5225b4cbb6e52032bca7d8e9f7cb7dc4cc1003b1c5d0d513",
    "level10": "53616c7465645f5f5225b4cbb6e52032bca7d8e9f7cb7dc4cc1003b1c5d0d513",
    "level11": "53616c7465645f5f5225b4cbb6e52032bca7d8e9f7cb7dc4cc1003b1c5d0d513"
}