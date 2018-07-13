module.exports = ({ orientation, mediaQueriesParams, atrule }) => {
  let result = null;
  try {
    if (orientation === '') {
      result = mediaQueriesParams;
    } else if (orientation === 'portrait' || orientation === 'landscape') {
      result = `${mediaQueriesParams} and (orientation: ${orientation})`;
    } else {
      atrule.remove();
      throw new Error(
        `\`${orientation}\` is in incorrect value of orientation. Use \`portrait\` or \`landscape\`.`,
      );
    }
  } catch (err) {
    console.warn(err.message);
  }

  return result;
};
