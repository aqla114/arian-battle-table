// source: arianrod.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.Character', null, global);
goog.exportSymbol('proto.GetGuildCharactersRequest', null, global);
goog.exportSymbol('proto.GetGuildCharactersResponse', null, global);
goog.exportSymbol('proto.Skill', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.GetGuildCharactersRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.GetGuildCharactersRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.GetGuildCharactersRequest.displayName = 'proto.GetGuildCharactersRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.GetGuildCharactersResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.GetGuildCharactersResponse.repeatedFields_, null);
};
goog.inherits(proto.GetGuildCharactersResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.GetGuildCharactersResponse.displayName = 'proto.GetGuildCharactersResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Character = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.Character.repeatedFields_, null);
};
goog.inherits(proto.Character, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Character.displayName = 'proto.Character';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Skill = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Skill, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Skill.displayName = 'proto.Skill';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.GetGuildCharactersRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.GetGuildCharactersRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.GetGuildCharactersRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.GetGuildCharactersRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    guildId: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.GetGuildCharactersRequest}
 */
proto.GetGuildCharactersRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.GetGuildCharactersRequest;
  return proto.GetGuildCharactersRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.GetGuildCharactersRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.GetGuildCharactersRequest}
 */
proto.GetGuildCharactersRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setGuildId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.GetGuildCharactersRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.GetGuildCharactersRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.GetGuildCharactersRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.GetGuildCharactersRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getGuildId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string guild_id = 1;
 * @return {string}
 */
proto.GetGuildCharactersRequest.prototype.getGuildId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.GetGuildCharactersRequest} returns this
 */
proto.GetGuildCharactersRequest.prototype.setGuildId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.GetGuildCharactersResponse.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.GetGuildCharactersResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.GetGuildCharactersResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.GetGuildCharactersResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.GetGuildCharactersResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    charactersList: jspb.Message.toObjectList(msg.getCharactersList(),
    proto.Character.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.GetGuildCharactersResponse}
 */
proto.GetGuildCharactersResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.GetGuildCharactersResponse;
  return proto.GetGuildCharactersResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.GetGuildCharactersResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.GetGuildCharactersResponse}
 */
proto.GetGuildCharactersResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.Character;
      reader.readMessage(value,proto.Character.deserializeBinaryFromReader);
      msg.addCharacters(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.GetGuildCharactersResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.GetGuildCharactersResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.GetGuildCharactersResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.GetGuildCharactersResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCharactersList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.Character.serializeBinaryToWriter
    );
  }
};


/**
 * repeated Character characters = 1;
 * @return {!Array<!proto.Character>}
 */
proto.GetGuildCharactersResponse.prototype.getCharactersList = function() {
  return /** @type{!Array<!proto.Character>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.Character, 1));
};


/**
 * @param {!Array<!proto.Character>} value
 * @return {!proto.GetGuildCharactersResponse} returns this
*/
proto.GetGuildCharactersResponse.prototype.setCharactersList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.Character=} opt_value
 * @param {number=} opt_index
 * @return {!proto.Character}
 */
proto.GetGuildCharactersResponse.prototype.addCharacters = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.Character, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.GetGuildCharactersResponse} returns this
 */
proto.GetGuildCharactersResponse.prototype.clearCharactersList = function() {
  return this.setCharactersList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.Character.repeatedFields_ = [23];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Character.prototype.toObject = function(opt_includeInstance) {
  return proto.Character.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Character} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Character.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    name: jspb.Message.getFieldWithDefault(msg, 2, ""),
    attribute: jspb.Message.getFieldWithDefault(msg, 3, ""),
    actionPriority: jspb.Message.getFieldWithDefault(msg, 4, 0),
    mobility: jspb.Message.getFieldWithDefault(msg, 5, 0),
    hp: jspb.Message.getFieldWithDefault(msg, 6, 0),
    physicalDefence: jspb.Message.getFieldWithDefault(msg, 7, 0),
    magicalDefence: jspb.Message.getFieldWithDefault(msg, 8, 0),
    strength: jspb.Message.getFieldWithDefault(msg, 9, 0),
    strengthBase: jspb.Message.getFieldWithDefault(msg, 10, 0),
    dexterity: jspb.Message.getFieldWithDefault(msg, 11, 0),
    dexterityBase: jspb.Message.getFieldWithDefault(msg, 12, 0),
    agility: jspb.Message.getFieldWithDefault(msg, 13, 0),
    agilityBase: jspb.Message.getFieldWithDefault(msg, 14, 0),
    wisdom: jspb.Message.getFieldWithDefault(msg, 15, 0),
    wisdomBase: jspb.Message.getFieldWithDefault(msg, 16, 0),
    sensitivity: jspb.Message.getFieldWithDefault(msg, 17, 0),
    sensitivityBase: jspb.Message.getFieldWithDefault(msg, 18, 0),
    power: jspb.Message.getFieldWithDefault(msg, 19, 0),
    powerBase: jspb.Message.getFieldWithDefault(msg, 20, 0),
    luck: jspb.Message.getFieldWithDefault(msg, 21, 0),
    luckBase: jspb.Message.getFieldWithDefault(msg, 22, 0),
    skillsList: jspb.Message.toObjectList(msg.getSkillsList(),
    proto.Skill.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Character}
 */
proto.Character.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Character;
  return proto.Character.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Character} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Character}
 */
proto.Character.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setAttribute(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setActionPriority(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setMobility(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setHp(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setPhysicalDefence(value);
      break;
    case 8:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setMagicalDefence(value);
      break;
    case 9:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setStrength(value);
      break;
    case 10:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setStrengthBase(value);
      break;
    case 11:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setDexterity(value);
      break;
    case 12:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setDexterityBase(value);
      break;
    case 13:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setAgility(value);
      break;
    case 14:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setAgilityBase(value);
      break;
    case 15:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setWisdom(value);
      break;
    case 16:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setWisdomBase(value);
      break;
    case 17:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setSensitivity(value);
      break;
    case 18:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setSensitivityBase(value);
      break;
    case 19:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setPower(value);
      break;
    case 20:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setPowerBase(value);
      break;
    case 21:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setLuck(value);
      break;
    case 22:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setLuckBase(value);
      break;
    case 23:
      var value = new proto.Skill;
      reader.readMessage(value,proto.Skill.deserializeBinaryFromReader);
      msg.addSkills(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Character.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Character.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Character} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Character.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getAttribute();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getActionPriority();
  if (f !== 0) {
    writer.writeInt32(
      4,
      f
    );
  }
  f = message.getMobility();
  if (f !== 0) {
    writer.writeInt32(
      5,
      f
    );
  }
  f = message.getHp();
  if (f !== 0) {
    writer.writeInt32(
      6,
      f
    );
  }
  f = message.getPhysicalDefence();
  if (f !== 0) {
    writer.writeInt32(
      7,
      f
    );
  }
  f = message.getMagicalDefence();
  if (f !== 0) {
    writer.writeInt32(
      8,
      f
    );
  }
  f = message.getStrength();
  if (f !== 0) {
    writer.writeInt32(
      9,
      f
    );
  }
  f = message.getStrengthBase();
  if (f !== 0) {
    writer.writeInt32(
      10,
      f
    );
  }
  f = message.getDexterity();
  if (f !== 0) {
    writer.writeInt32(
      11,
      f
    );
  }
  f = message.getDexterityBase();
  if (f !== 0) {
    writer.writeInt32(
      12,
      f
    );
  }
  f = message.getAgility();
  if (f !== 0) {
    writer.writeInt32(
      13,
      f
    );
  }
  f = message.getAgilityBase();
  if (f !== 0) {
    writer.writeInt32(
      14,
      f
    );
  }
  f = message.getWisdom();
  if (f !== 0) {
    writer.writeInt32(
      15,
      f
    );
  }
  f = message.getWisdomBase();
  if (f !== 0) {
    writer.writeInt32(
      16,
      f
    );
  }
  f = message.getSensitivity();
  if (f !== 0) {
    writer.writeInt32(
      17,
      f
    );
  }
  f = message.getSensitivityBase();
  if (f !== 0) {
    writer.writeInt32(
      18,
      f
    );
  }
  f = message.getPower();
  if (f !== 0) {
    writer.writeInt32(
      19,
      f
    );
  }
  f = message.getPowerBase();
  if (f !== 0) {
    writer.writeInt32(
      20,
      f
    );
  }
  f = message.getLuck();
  if (f !== 0) {
    writer.writeInt32(
      21,
      f
    );
  }
  f = message.getLuckBase();
  if (f !== 0) {
    writer.writeInt32(
      22,
      f
    );
  }
  f = message.getSkillsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      23,
      f,
      proto.Skill.serializeBinaryToWriter
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.Character.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.Character} returns this
 */
proto.Character.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string name = 2;
 * @return {string}
 */
proto.Character.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.Character} returns this
 */
proto.Character.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string attribute = 3;
 * @return {string}
 */
proto.Character.prototype.getAttribute = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.Character} returns this
 */
proto.Character.prototype.setAttribute = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional int32 action_priority = 4;
 * @return {number}
 */
proto.Character.prototype.getActionPriority = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.Character} returns this
 */
proto.Character.prototype.setActionPriority = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional int32 mobility = 5;
 * @return {number}
 */
proto.Character.prototype.getMobility = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.Character} returns this
 */
proto.Character.prototype.setMobility = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional int32 hp = 6;
 * @return {number}
 */
proto.Character.prototype.getHp = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {number} value
 * @return {!proto.Character} returns this
 */
proto.Character.prototype.setHp = function(value) {
  return jspb.Message.setProto3IntField(this, 6, value);
};


/**
 * optional int32 physical_defence = 7;
 * @return {number}
 */
proto.Character.prototype.getPhysicalDefence = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {number} value
 * @return {!proto.Character} returns this
 */
proto.Character.prototype.setPhysicalDefence = function(value) {
  return jspb.Message.setProto3IntField(this, 7, value);
};


/**
 * optional int32 magical_defence = 8;
 * @return {number}
 */
proto.Character.prototype.getMagicalDefence = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};


/**
 * @param {number} value
 * @return {!proto.Character} returns this
 */
proto.Character.prototype.setMagicalDefence = function(value) {
  return jspb.Message.setProto3IntField(this, 8, value);
};


/**
 * optional int32 strength = 9;
 * @return {number}
 */
proto.Character.prototype.getStrength = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 9, 0));
};


/**
 * @param {number} value
 * @return {!proto.Character} returns this
 */
proto.Character.prototype.setStrength = function(value) {
  return jspb.Message.setProto3IntField(this, 9, value);
};


/**
 * optional int32 strength_base = 10;
 * @return {number}
 */
proto.Character.prototype.getStrengthBase = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 10, 0));
};


/**
 * @param {number} value
 * @return {!proto.Character} returns this
 */
proto.Character.prototype.setStrengthBase = function(value) {
  return jspb.Message.setProto3IntField(this, 10, value);
};


/**
 * optional int32 dexterity = 11;
 * @return {number}
 */
proto.Character.prototype.getDexterity = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 11, 0));
};


/**
 * @param {number} value
 * @return {!proto.Character} returns this
 */
proto.Character.prototype.setDexterity = function(value) {
  return jspb.Message.setProto3IntField(this, 11, value);
};


/**
 * optional int32 dexterity_base = 12;
 * @return {number}
 */
proto.Character.prototype.getDexterityBase = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 12, 0));
};


/**
 * @param {number} value
 * @return {!proto.Character} returns this
 */
proto.Character.prototype.setDexterityBase = function(value) {
  return jspb.Message.setProto3IntField(this, 12, value);
};


/**
 * optional int32 agility = 13;
 * @return {number}
 */
proto.Character.prototype.getAgility = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 13, 0));
};


/**
 * @param {number} value
 * @return {!proto.Character} returns this
 */
proto.Character.prototype.setAgility = function(value) {
  return jspb.Message.setProto3IntField(this, 13, value);
};


/**
 * optional int32 agility_base = 14;
 * @return {number}
 */
proto.Character.prototype.getAgilityBase = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 14, 0));
};


/**
 * @param {number} value
 * @return {!proto.Character} returns this
 */
proto.Character.prototype.setAgilityBase = function(value) {
  return jspb.Message.setProto3IntField(this, 14, value);
};


/**
 * optional int32 wisdom = 15;
 * @return {number}
 */
proto.Character.prototype.getWisdom = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 15, 0));
};


/**
 * @param {number} value
 * @return {!proto.Character} returns this
 */
proto.Character.prototype.setWisdom = function(value) {
  return jspb.Message.setProto3IntField(this, 15, value);
};


/**
 * optional int32 wisdom_base = 16;
 * @return {number}
 */
proto.Character.prototype.getWisdomBase = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 16, 0));
};


/**
 * @param {number} value
 * @return {!proto.Character} returns this
 */
proto.Character.prototype.setWisdomBase = function(value) {
  return jspb.Message.setProto3IntField(this, 16, value);
};


/**
 * optional int32 sensitivity = 17;
 * @return {number}
 */
proto.Character.prototype.getSensitivity = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 17, 0));
};


/**
 * @param {number} value
 * @return {!proto.Character} returns this
 */
proto.Character.prototype.setSensitivity = function(value) {
  return jspb.Message.setProto3IntField(this, 17, value);
};


/**
 * optional int32 sensitivity_base = 18;
 * @return {number}
 */
proto.Character.prototype.getSensitivityBase = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 18, 0));
};


/**
 * @param {number} value
 * @return {!proto.Character} returns this
 */
proto.Character.prototype.setSensitivityBase = function(value) {
  return jspb.Message.setProto3IntField(this, 18, value);
};


/**
 * optional int32 power = 19;
 * @return {number}
 */
proto.Character.prototype.getPower = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 19, 0));
};


/**
 * @param {number} value
 * @return {!proto.Character} returns this
 */
proto.Character.prototype.setPower = function(value) {
  return jspb.Message.setProto3IntField(this, 19, value);
};


/**
 * optional int32 power_base = 20;
 * @return {number}
 */
proto.Character.prototype.getPowerBase = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 20, 0));
};


/**
 * @param {number} value
 * @return {!proto.Character} returns this
 */
proto.Character.prototype.setPowerBase = function(value) {
  return jspb.Message.setProto3IntField(this, 20, value);
};


/**
 * optional int32 luck = 21;
 * @return {number}
 */
proto.Character.prototype.getLuck = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 21, 0));
};


/**
 * @param {number} value
 * @return {!proto.Character} returns this
 */
proto.Character.prototype.setLuck = function(value) {
  return jspb.Message.setProto3IntField(this, 21, value);
};


/**
 * optional int32 luck_base = 22;
 * @return {number}
 */
proto.Character.prototype.getLuckBase = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 22, 0));
};


/**
 * @param {number} value
 * @return {!proto.Character} returns this
 */
proto.Character.prototype.setLuckBase = function(value) {
  return jspb.Message.setProto3IntField(this, 22, value);
};


/**
 * repeated Skill skills = 23;
 * @return {!Array<!proto.Skill>}
 */
proto.Character.prototype.getSkillsList = function() {
  return /** @type{!Array<!proto.Skill>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.Skill, 23));
};


/**
 * @param {!Array<!proto.Skill>} value
 * @return {!proto.Character} returns this
*/
proto.Character.prototype.setSkillsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 23, value);
};


/**
 * @param {!proto.Skill=} opt_value
 * @param {number=} opt_index
 * @return {!proto.Skill}
 */
proto.Character.prototype.addSkills = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 23, opt_value, proto.Skill, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.Character} returns this
 */
proto.Character.prototype.clearSkillsList = function() {
  return this.setSkillsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Skill.prototype.toObject = function(opt_includeInstance) {
  return proto.Skill.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Skill} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Skill.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: jspb.Message.getFieldWithDefault(msg, 1, ""),
    timing: jspb.Message.getFieldWithDefault(msg, 2, ""),
    determinationWay: jspb.Message.getFieldWithDefault(msg, 3, ""),
    target: jspb.Message.getFieldWithDefault(msg, 4, ""),
    range: jspb.Message.getFieldWithDefault(msg, 5, ""),
    restriction: jspb.Message.getFieldWithDefault(msg, 6, ""),
    detail: jspb.Message.getFieldWithDefault(msg, 7, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Skill}
 */
proto.Skill.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Skill;
  return proto.Skill.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Skill} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Skill}
 */
proto.Skill.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setTiming(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setDeterminationWay(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setTarget(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setRange(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setRestriction(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setDetail(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Skill.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Skill.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Skill} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Skill.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getTiming();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getDeterminationWay();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getTarget();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getRange();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getRestriction();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
  f = message.getDetail();
  if (f.length > 0) {
    writer.writeString(
      7,
      f
    );
  }
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.Skill.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.Skill} returns this
 */
proto.Skill.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string timing = 2;
 * @return {string}
 */
proto.Skill.prototype.getTiming = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.Skill} returns this
 */
proto.Skill.prototype.setTiming = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string determination_way = 3;
 * @return {string}
 */
proto.Skill.prototype.getDeterminationWay = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.Skill} returns this
 */
proto.Skill.prototype.setDeterminationWay = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string target = 4;
 * @return {string}
 */
proto.Skill.prototype.getTarget = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.Skill} returns this
 */
proto.Skill.prototype.setTarget = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string range = 5;
 * @return {string}
 */
proto.Skill.prototype.getRange = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.Skill} returns this
 */
proto.Skill.prototype.setRange = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional string restriction = 6;
 * @return {string}
 */
proto.Skill.prototype.getRestriction = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.Skill} returns this
 */
proto.Skill.prototype.setRestriction = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
};


/**
 * optional string detail = 7;
 * @return {string}
 */
proto.Skill.prototype.getDetail = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/**
 * @param {string} value
 * @return {!proto.Skill} returns this
 */
proto.Skill.prototype.setDetail = function(value) {
  return jspb.Message.setProto3StringField(this, 7, value);
};


goog.object.extend(exports, proto);
