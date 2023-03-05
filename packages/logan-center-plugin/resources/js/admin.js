/* eslint-disable */
var kleinwebAdmin = {
  enabledHomeUrlEdit: function () {
    // This function enables the setting the home URL field that Flywheel disables
    jQuery('input#home')
      .prop('readonly', false)
      .prop('disabled', false)
      .removeClass('disabled')

    jQuery('input#home')
      .parent()
      .append("<p class='description'>Enter the primary front end URL.</p>")
  },
  showAttachmentIds: function () {
    // Show the attachment IDs on hover of attachment grid blocks
    jQuery(document).on(
      'mouseenter',
      '.media-modal .attachment, .media-frame .attachment',
      function () {
        var id = jQuery(this).data('id')
        if (id) {
          jQuery(this).attr('title', 'Attachment ID: ' + id)
        }
      },
    )
  },
  shiftClickNestedPages: function () {
    // Enable shift-clicking on NestedPages admin lists
    var lastChecked = null
    jQuery('#wpbody-content').on(
      'click',
      ".nestedpages .np-bulk-checkbox input[type='checkbox']",
      function (e) {
        // Abort if first click
        if (!lastChecked) {
          lastChecked = this
          return
        }

        // Handle shift clicking and auto selecting all following checkboxes
        var $chkboxes = jQuery(
          ".nestedpages .np-bulk-checkbox input[type='checkbox']",
        )
        if (e.shiftKey) {
          var start = $chkboxes.index(this)
          var end = $chkboxes.index(lastChecked)
          $chkboxes
            .slice(Math.min(start, end), Math.max(start, end) + 1)
            .prop('checked', lastChecked.checked)
        }

        lastChecked = this
      },
    )
  },
  removeUnusedBlocks: function () {
    // This functions removes some blocks from the Gutenberg editor.
    // SEE: https://wordpress.stackexchange.com/questions/379612/how-to-remove-the-core-embed-blocks-in-wordpress-5-6

    if (typeof wp.domReady == 'undefined') {
      return
    }

    wp.domReady(function () {
      let allowedEmbedBlocks = ['vimeo', 'youtube']
      if (kleinwebAdmin.isGutenbergActive())
        wp.blocks
          .getBlockVariations('core/embed')
          .forEach(function (blockVariation) {
            if (-1 === allowedEmbedBlocks.indexOf(blockVariation.name)) {
              wp.blocks.unregisterBlockVariation(
                'core/embed',
                blockVariation.name,
              )
            }
          })
    })
  },
  isGutenbergActive: function () {
    return typeof wp !== 'undefined' && typeof wp.blocks !== 'undefined'
  },
}
jQuery(document).ready(function () {
  kleinwebAdmin.showAttachmentIds()
  kleinwebAdmin.shiftClickNestedPages()
  kleinwebAdmin.removeUnusedBlocks()
})
jQuery(window).load(function () {
  if (jQuery('body').hasClass('options-general-php')) {
    kleinwebAdmin.enabledHomeUrlEdit()
  }
})
