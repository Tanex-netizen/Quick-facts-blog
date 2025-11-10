function mapPost(row) {
  if (!row) {
    return null;
  }

  const toIsoOrNull = (value) => (value ? new Date(value).toISOString() : null);

  return {
    id: row.id,
    title: row.title,
    description: row.description,
    imageUrl: row.image_url,
    category: row.category,
    scheduledAt: toIsoOrNull(row.scheduled_at),
    publishedAt: toIsoOrNull(row.published_at),
    createdAt: toIsoOrNull(row.created_at),
    status: row.published_at ? 'published' : 'scheduled',
  };
}

module.exports = {
  mapPost,
};
