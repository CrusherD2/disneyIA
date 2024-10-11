<script lang="ts">
  import * as Card from '$lib/components/ui/card';

  export let title = 'Card Title';
  export let summary = 'Card Summary';
  export let author = 'Card Author';
  export let date = 'Card Date';
</script>

<Card.Root>
  <Card.Header>
    <Card.Title>{title}</Card.Title>
  </Card.Header>
  <Card.Content>
    <p>{summary}</p>
  </Card.Content>
  <Card.Footer>
    <p>Author: {author} - {date}</p>
  </Card.Footer>
</Card.Root>
