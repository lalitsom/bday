
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
    "level2": "53616c7465645f5f48e689b883a8816d7938a22f30558b6869a17db18b7624992f2899771b295ec8564240bd486415bb1e2227348297ddb55e7bc274c7781a1930711b22c1ec7b555f84b46ff84827386a9d3c72d95a4bdac1ec15b1d414cea1e4a8acce13bbc0ed16e22cfd35bcefec0066d6443cf34320f8d77355fedc6b222ff6c8aee82ddb56235edd1ed90fa2c5aeac150062ea4d859d0869e78db1f29168863b660bc31db3c9a2af780ab85f9f6fc74ef461533d7b499c118217f6ead7b94cc80ec79cceeba1e6114b3275421e8cfdeb3b9b81612c39c9a3ef723c8d4b27c9e7d12ff5a2e3e3670f00fcba5f8c",
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