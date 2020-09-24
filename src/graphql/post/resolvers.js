'use strict';
const Post = require('../../models/Post');
const { authenticated } = require('../../services/auth');
const { formatDate } = require('../../helpers/common');
const moment = require('moment-timezone');

const postResolver = {
    Query: {
        posts: authenticated((async (root, { filters = {} }, context) => {
            const query = {};

            return Post
                .find(query)
                .sort({ _id: -1 })
                .populate('userId')
                .catch(err => console.error(err));
        }))
    },
    Mutation: {
        addPost: authenticated((async (root, { input }, context) => {
            input.updatedAt = formatDate(moment().tz('America/Mexico_City').format());
            input.userId = context.currentUser._id;
            const post = await Post.create(input);
            return post.toObject();
        })),
        deletePost: authenticated((async (root, { id }, context) => {
            const query = {
                _id: id
            };

            return !!Post
                .deleteOne(query)
                .catch(() => console.log('Error at Lost Object resolver deleteOne'));
        })),
        updatePost: authenticated((async (root, { id, input }, context) => {
            input.updatedAt = formatDate(moment().tz('America/Mexico_City').format());

            return Post
                .findByIdAndUpdate(id, input, { new: true })
                .catch(e => console.error(e));
        }))
    }
};

module.exports = postResolver;