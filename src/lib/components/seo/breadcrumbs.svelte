<script lang='ts'>
  export let breadcrumbs: { name: string; href: string }[] = [];
</script>

<nav aria-label="Breadcrumb" class="breadcrumb-nav">
  <ol class="breadcrumb-list">
    {#each breadcrumbs as item, i}
      <li class="breadcrumb-item">
        {#if i > 0}
          <span class="breadcrumb-separator">/</span>
        {/if}
        {#if i < breadcrumbs.length - 1}
          <a href={item.href} class="breadcrumb-link">{item.name}</a>
        {:else}
          <span class="breadcrumb-current">{item.name}</span>
        {/if}
      </li>
    {/each}
  </ol>
</nav>

<style>
  .breadcrumb-nav {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .breadcrumb-list {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 0.875rem;
    color: #6b7280;
    flex-wrap: wrap;
  }

  .breadcrumb-item {
    display: flex;
    align-items: center;
  }

  .breadcrumb-separator {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }

  .breadcrumb-link {
    color: #6b7280;
    text-decoration: none;
    transition: color 0.2s ease-in-out;
  }

  .breadcrumb-link:hover {
    text-decoration: underline;
    color: #4b5563;
  }

  .breadcrumb-current {
    color: #374151;
    font-weight: 500;
  }
</style>