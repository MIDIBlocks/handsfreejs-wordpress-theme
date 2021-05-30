<?php
/**
 * [demo-pinchers]
 * - Displays a circle for each finger that gets illuminated when those fingers are pinched
 */
add_shortcode('demo-pinchers', function () {
  ob_start(); ?>
    <section>
      <table>
        <thead>
          <tr>
            <th>Hand</th>
            <th>Index [0]</th>
            <th>Middle [1]</th>
            <th>Ring [2]</th>
            <th>Pinky [3]</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Left</th>
            <td>
              <div class="finger-pincher handsfree-hide-when-finger-pinched-0-0"></div>
              <div class="finger-pincher handsfree-show-when-finger-pinched-0-0"></div>
            </td>
            <td>
              <div class="finger-pincher handsfree-hide-when-finger-pinched-0-1"></div>
              <div class="finger-pincher handsfree-show-when-finger-pinched-0-1"></div>
            </td>
            <td>
              <div class="finger-pincher handsfree-hide-when-finger-pinched-0-2"></div>
              <div class="finger-pincher handsfree-show-when-finger-pinched-0-2"></div>
            </td>
            <td>
              <div class="finger-pincher handsfree-hide-when-finger-pinched-0-3"></div>
              <div class="finger-pincher handsfree-show-when-finger-pinched-0-3"></div>
            </td>
          </tr>
          <tr>
            <th>Right</th>
            <td>
              <div class="finger-pincher handsfree-hide-when-finger-pinched-1-0"></div>
              <div class="finger-pincher handsfree-show-when-finger-pinched-1-0"></div>
            </td>
            <td>
              <div class="finger-pincher handsfree-hide-when-finger-pinched-1-1"></div>
              <div class="finger-pincher handsfree-show-when-finger-pinched-1-1"></div>
            </td>
            <td>
              <div class="finger-pincher handsfree-hide-when-finger-pinched-1-2"></div>
              <div class="finger-pincher handsfree-show-when-finger-pinched-1-2"></div>
            </td>
            <td>
              <div class="finger-pincher handsfree-hide-when-finger-pinched-1-3"></div>
              <div class="finger-pincher handsfree-show-when-finger-pinched-1-3"></div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  <?php return ob_get_clean();  
});